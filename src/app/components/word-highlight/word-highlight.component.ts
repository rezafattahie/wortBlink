import {
  Component,
  effect,
  input,
  Output,
  EventEmitter,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-word-highlight',
  standalone: true,
  imports: [],
  templateUrl: './word-highlight.component.html',
  styleUrl: './word-highlight.component.scss',
})
export class WordHighlightComponent {
  textToProcess = input<string>('');
  @Output() selectedWord = new EventEmitter<string>();
  lines = signal<{ line: number; words: string[] }[]>([]);

  constructor() {
    effect(() => this.processText(), { allowSignalWrites: true });
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
  }
}
