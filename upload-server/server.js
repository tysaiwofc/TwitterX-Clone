const express = require('express');
const multer = require('multer');
const path = require('node:path');
const fs = require('node:fs');
const ffmpeg = require('fluent-ffmpeg');
const cors = require('cors');
const sharp = require('sharp'); // Para compressão de imagens
const app = express();
const PORT = process.env.PORT || 80;
function cleanString(input) {
    // Remove todos os caracteres que não são letras, números ou underscore
    return input.replace(/[^a-zA-Z0-9_]/g, '');
}

app.use(cors());

// Configuração do multer para o upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Pasta onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        // Divide o nome do arquivo e a extensão
        const originalName = file.originalname;
        const dotIndex = originalName.lastIndexOf('.'); // Encontra a última ocorrência do ponto
        const name = dotIndex !== -1 ? originalName.slice(0, dotIndex) : originalName; // Nome do arquivo sem extensão
        const ext = dotIndex !== -1 ? originalName.slice(dotIndex) : ''; // Extensão do arquivo
        
        // Limpa o nome do arquivo
        const cleanedName = cleanString(name);

        // Combina o nome limpo com a extensão
        cb(null, `${Date.now()}-${cleanedName}${ext}`); // Nome do arquivo
    },
});


const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // Limite de 50MB
});

// Função para converter o vídeo para HLS e gerar várias resoluções
const convertToHLS = (inputPath, outputFolder, cb) => {
    const outputPath = path.join(outputFolder, 'master.m3u8'); // Arquivo de saída HLS

    // ffmpeg comando para gerar HLS com múltiplas resoluções
    ffmpeg(inputPath)
        .output(path.join(outputFolder, 'master.m3u8'))
        .outputOptions([
            '-preset veryfast',  // Codificação rápida
            '-g 48',
            '-sc_threshold 0',
            '-hls_time 6',
            '-hls_playlist_type vod',
            '-hls_segment_filename', path.join(outputFolder, 'segment_%v_%03d.ts'),

            // Compressão do vídeo
            '-crf 28',  // Controla a qualidade. 23 é o padrão, valores maiores reduzem a qualidade/comprimem mais.
            '-b:v 500k',  // Limita a taxa de bits para 500kbps
            '-maxrate 500k',
            '-bufsize 1000k',

            // Redução de resolução (exemplo: 720p)
            '-vf scale=-2:720' // Redimensiona para 720p, preservando a proporção
        ])
        .on('end', () => {
            console.log('Conversão para HLS concluída.');

            // Deletar o arquivo de entrada após a conversão
            fs.unlink(inputPath, (err) => {
                if (err) {
                    console.error('Erro ao deletar o arquivo de entrada:', err);
                    return cb(err);
                }
                console.log(`Arquivo de entrada deletado: ${inputPath}`);
                cb(null, outputPath); // Continue com o callback após a deleção
            });
        })
        .on('error', (err) => {
            console.error('Erro durante a conversão para HLS:', err);
            cb(err);
        })
        .run();
};

// Middleware para receber uploads de arquivos
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    const inputPath = path.join(__dirname, 'uploads', req.file.filename);
    const outputFolder = path.join(__dirname, 'uploads', req.file.filename.split('.')[0]);

    // Criar a pasta de saída se não existir
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }

    // Verificar o tipo de arquivo através do mimetype
    const mimeType = req.file.mimetype;

    // Verifica se o arquivo é uma imagem
    if (mimeType.startsWith('image/')) {
        // Compressão de imagem usando sharp
        const outputImage = path.join(outputFolder, `${req.file.filename.split('.')[0]}-compressed.jpg`);
        sharp(inputPath)
            .jpeg({ quality: 80 }) // Define a qualidade da imagem JPEG
            .toFile(outputImage, (err, info) => {
                if (err) {
                    return res.status(500).send('Erro ao comprimir a imagem.');
                }
                const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename.split('.')[0]}/${path.basename(outputImage)}`;
                return res.send({
                    message: 'Imagem enviada e comprimida com sucesso!',
                    file: {
                        filename: req.file.filename,
                        url: imageUrl,
                    },
                });
            });
    } 
    // Caso seja um vídeo, converte para HLS
    else if (mimeType.startsWith('video/')) {
        convertToHLS(inputPath, outputFolder, (err, outputPath) => {
            if (err) {
                return res.status(500).send('Erro durante a conversão para HLS.');
            }

            // Retornar a URL do arquivo HLS
            const hlsUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename.split('.')[0]}/master.m3u8`;
            res.send({
                message: 'Vídeo enviado e convertido com sucesso!',
                file: {
                    filename: req.file.filename,
                    url: hlsUrl,
                },
            });
        });
    } 
    // Se o arquivo não for uma imagem ou vídeo
    else {
        return res.status(400).send('Formato de arquivo não suportado.');
    }
});


// Rota para acessar os arquivos na pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
