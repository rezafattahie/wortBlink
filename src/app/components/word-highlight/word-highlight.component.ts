import {} from '@angular/common/http';
import {
  Component,
  effect,
  input,
  Output,
  EventEmitter,
  signal,
  inject,
  ViewChild,
  TemplateRef,
  computed,
} from '@angular/core';

import { TranslateService } from '../../services/translate.service';
import { wordInfoSignal } from '../../signal-store/wordInfo.signal-store';
import { CardComponent } from '../card/card.component';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-word-highlight',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './word-highlight.component.html',
  styleUrl: './word-highlight.component.scss',
})
export class WordHighlightComponent {
  translateService = inject(TranslateService);
  cardService = inject(CardService);

  textToProcess = input<string>('');
  wordDetails = computed(() => wordInfoSignal());
  @Output() selectedWord = new EventEmitter<string>();
  lines = signal<{ line: number; words: string[] }[]>([]);
  @ViewChild('cardTemplate') cardTemplate!: TemplateRef<any>;

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
    this.cardService.showCard(word, {
      template: this.cardTemplate,
      context: { result: this.wordDetails },
    });
  }
}
