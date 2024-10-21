import multer from 'multer';
import { cleanString } from './utils.js';

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {

        const originalName = file.originalname;
        const dotIndex = originalName.lastIndexOf('.');
        const name = dotIndex !== -1 ? originalName.slice(0, dotIndex) : originalName;
        const ext = dotIndex !== -1 ? originalName.slice(dotIndex) : '';

        const cleanedName = cleanString(name);

        cb(null, `${Date.now()}-${cleanedName}${ext}`);
    },
});


export const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 },
});