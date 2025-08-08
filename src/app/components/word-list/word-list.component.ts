import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  effect,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-word-list',
  standalone: true,
  imports: [],
  templateUrl: './word-list.component.html',
  styleUrl: './word-list.component.scss',
})
export class WordListComponent {
  selectedWord = input<string>();
  wordlist = signal<string[]>([]);

  constructor() {
    effect(
      () => {
        const word = this.selectedWord();
        if (word) {
          const current = this.wordlist();
          if (!current.includes(word)) {
            this.wordlist.set([...current, word]);
          }
        }
      },
      { allowSignalWrites: true }
    );
  }
}
