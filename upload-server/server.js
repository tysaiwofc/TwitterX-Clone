const express = require('express');
const multer = require('multer');
const path = require('node:path');
const fs = require('node:fs');

const app = express();
const PORT = process.env.PORT || 80;

// Configuração do multer para o upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Pasta onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nome do arquivo
    },
});

const upload = multer({ storage });

// Middleware para receber uploads de arquivos
app.post('/upload', upload.single('file'), (req, res) => {

    console.log("FILE SENDO ENVIADO")
    if (!req.file) {
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }
    
    // Retornar a URL do arquivo enviado
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.send({
        message: 'Arquivo enviado com sucesso!',
        file: {
            filename: req.file.filename,
            url: fileUrl,
        },
    });
});

// Rota para acessar os arquivos na pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rota para streaming de arquivos
app.get('/stream/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);

    // Verificar se o arquivo existe
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            return res.status(404).send('Arquivo não encontrado.');
        }

        // Configurar cabeçalhos para o streaming
        res.writeHead(200, {
            'Content-Type': 'video/mp4', // ou outro tipo de arquivo, se necessário
            'Accept-Ranges': 'bytes',
        });

        // Obter os parâmetros de intervalo (bytes)
        const range = req.headers.range;
        if (!range) {
            return res.status(416).send('O intervalo é necessário.');
        }

        const start = Number(range.replace(/\D/g, ''));
        const end = stats.size - 1;

        // Definir o cabeçalho Content-Range
        res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${stats.size}`,
            'Content-Length': end - start + 1,
            'Content-Type': 'video/mp4',
        });

        // Criar um stream de leitura
        const stream = fs.createReadStream(filePath, { start, end });
        stream.pipe(res);
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
