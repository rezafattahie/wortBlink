import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubtitleService {
  private recognition: SpeechRecognition | null = null;
  private isListening = false;

constructor() {
  if (typeof window !== 'undefined') {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      this.recognition = new SpeechRecognitionClass();
      this.recognition!.continuous = true;
      this.recognition!.interimResults = true;
      this.recognition!.lang = 'de-DE';
    } else {
      console.error('SpeechRecognition not supported in this browser.');
    }
  } else {
    console.warn('SpeechRecognition disabled (SSR mode).');
  }
}


  start(
    onFinal: (text: string) => void,
    onPartial?: (text: string) => void
  ) {
    if (!this.recognition || this.isListening) return;
    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;

      if (result.isFinal) {
        // the whole sentence
        onFinal(transcript.trim());
      } else if (onPartial) {
        // creating the sentence
        onPartial(transcript);
      }
    };

    this.recognition.onerror = (err: any) => {
      console.error('Speech recognition error:', err);
      this.isListening = false;
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    this.recognition.start();
  }

  stop() {
    if (!this.recognition || !this.isListening) return;
    this.isListening = false;
    this.recognition.stop();
  }
}
