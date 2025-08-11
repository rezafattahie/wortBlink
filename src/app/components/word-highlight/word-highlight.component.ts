import {} from '@angular/common/http';
import {
  Component,
  effect,
  input,
  Output,
  EventEmitter,
  signal,
  inject,
} from '@angular/core';

import { TranslateService } from '../../services/translate.service';
import { wordInfoSignal } from '../../signal-store/wordInfo.signal-store';

@Component({
  selector: 'app-word-highlight',
  standalone: true,
  imports: [],
  templateUrl: './word-highlight.component.html',
  styleUrl: './word-highlight.component.scss',
})
export class WordHighlightComponent {
  translateService = inject(TranslateService);

  textToProcess = input<string>('');
  @Output() selectedWord = new EventEmitter<string>();
  lines = signal<{ line: number; words: string[] }[]>([]);

  constructor() {
    effect(
      () => {
        this.processText();
        const info = wordInfoSignal();
        console.log(info);
      },
      { allowSignalWrites: true }
    );
  }

  processText() {
    const inputText = this.textToProcess();
    const lines = inputText
      .split('\n')
      .map((line, idx) => {
        const words = line.trim().split(/\s+/);
        return { line: idx + 1, words };
      })
      .filter((line) => line.words.length > 0);

    this.lines.set(lines);
  }

  onSelectWord(word: string) {
    this.selectedWord.emit(word);
    this.translateService.getWordsInfo(word);
  }
}
