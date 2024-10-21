import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const parentDir = join(__dirname, '..');