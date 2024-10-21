import ffmpeg from 'fluent-ffmpeg';
import { unlink } from 'node:fs';
export const convertToHLS = (inputPath, outputFolder, cb) => {
    const outputPath = join(outputFolder, 'master.m3u8');

    ffmpeg(inputPath)
        .output(join(outputFolder, 'master.m3u8'))
        .outputOptions([
            '-preset veryfast',
            '-g 48',
            '-sc_threshold 0',
            '-hls_time 6',
            '-hls_playlist_type vod',
            '-hls_segment_filename', join(outputFolder, 'segment_%v_%03d.ts'),

            '-crf 28',
            '-b:v 500k',
            '-maxrate 500k',
            '-bufsize 1000k',

            '-vf scale=-2:720'
        ])
        .on('end', () => {
            unlink(inputPath, (err) => {
                if (err) {
                    console.error(err);
                    return cb(err);
                }
                cb(null, outputPath);
            });
        })
        .on('error', (err) => {
            console.error(err);
            cb(err);
        })
        .run();
};