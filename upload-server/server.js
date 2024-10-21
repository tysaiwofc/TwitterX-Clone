import express from 'express';
import cors from 'cors';
import { join, basename } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { convertToHLS } from './lib/hls_convert.js'
import sharp from 'sharp';
import { upload, storage } from './lib/storage.js';
import { parentDir as __dirname } from './lib/dirname.js';
import { config } from 'dotenv';

config();
const app = express();
const PORT = process.env.PORT || 80;


app.use(cors());

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('NO_FILE_ERROR');
    }

    const inputPath = join(__dirname, 'uploads', req.file.filename);
    const outputFolder = join(__dirname, 'uploads', req.file.filename.split('.')[0]);

    if (!existsSync(outputFolder)) {
        mkdirSync(outputFolder);
    }

    const mimeType = req.file.mimetype;
    const outputImage = join(outputFolder, `${req.file.filename.split('.')[0]}-compressed.jpg`);


    if (mimeType.startsWith('image/')) return sharp(inputPath)
        .jpeg({ quality: 80 })
        .toFile(outputImage, (err, info) => {
            if (err) {
                return res.status(500).send('IMAGE_COMPRESS_ERROR');
            }
            const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename.split('.')[0]}/${basename(outputImage)}`;
            return res.send({
                message: 'SUCCESS',
                file: {
                    filename: req.file.filename,
                    url: imageUrl,
                },
            });
        });

        

    
    if (mimeType.startsWith('video/')) return convertToHLS(inputPath, outputFolder, (err, outputPath) => {
        if (err) return res.status(500).send('HLS_CONVERT_ERROR');
        
        const hlsUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename.split('.')[0]}/master.m3u8`;
        return res.send({
            message: 'SUCCESS',
            file: {
                filename: req.file.filename,
                url: hlsUrl,
            },
        });
    });


    return res.status(400).send('FILE_FORMAT_NO_SUPPORT');
    
});


app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.listen(PORT, () => {
    console.log(`✅ - Running at http://localhost:${PORT}`);
});
