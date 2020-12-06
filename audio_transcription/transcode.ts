import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { Readable } from 'stream';

const ffmpegPath = ffmpegInstaller.path;

const transcodeAudioStream = async (audioStreamIn: Readable):
    Promise<void> => new Promise((resolve, reject) => {
  // Transcode
  ffmpeg(audioStreamIn)
    .setFfmpegPath(ffmpegPath)
    .outputOptions(
      '-f', 'wav',
      '-ac', '1',
      '-acodec', 'pcm_s16le',
      '-b:a', '128k',
      '-ar', '16000',
    ).on('start', (cmdLine) => {
      console.log('Started ffmpeg with command:', cmdLine);
    })
    .on('progress', (progress) => {
      console.log(`[ffmpeg] ${JSON.stringify(progress)}`);
    })
    .on('error', (err) => {
      console.log(`[ffmpeg] error: ${err.message}`);
      reject(err);
    })
    .on('end', () => {
      console.log('[ffmpeg] finished');
      resolve();
    })
    .save('test.wav');
});
export default transcodeAudioStream;
