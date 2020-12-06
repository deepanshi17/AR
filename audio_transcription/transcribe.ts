import * as Speech from '@google-cloud/speech';
import { google } from '@google-cloud/speech/build/protos/protos';
import IRecognizeRequest = google.cloud.speech.v1.IRecognizeRequest;
import IRecognitionConfig = google.cloud.speech.v1.IRecognitionConfig;
import IRecognitionAudio = google.cloud.speech.v1.IRecognitionAudio;

const ENCODING = 'LINEAR16'; // was 'LINEAR16'
const SAMPLE_RATE_HERTZ = 16000;
const LANGUAGE = 'en-US';

const config: IRecognitionConfig = {
  encoding: ENCODING,
  sampleRateHertz: SAMPLE_RATE_HERTZ,
  languageCode: LANGUAGE,
  audioChannelCount: 1,
};

const transcribeAudioStream = (base64Data : string) => {
  const audio: IRecognitionAudio = {
    content: base64Data,
  };
  const request: IRecognizeRequest = {
    config,
    audio,
  };
  const speech = new Speech.SpeechClient();

  return speech.recognize(request).then((response) => response).catch((error) => {
    console.log('SPEECH error:', error);
  });
};

export default transcribeAudioStream;
