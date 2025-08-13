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
  activeTab: 'translation' | 'examples' | 'phrases' | 'daily' = 'translation';
  clickedPosition = { top: 0, left: 0, right: 0, bottom: 0 };
  wordDetails = computed(() => wordInfoSignal());
  @Output() selectedWord = new EventEmitter<string>();
  lines = signal<{ line: number; words: string[] }[]>([]);
  @ViewChild('cardTemplate') cardTemplate!: TemplateRef<any>;

  constructor() {
    effect(
      () => {
        this.processText();
        const info = wordInfoSignal();
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

  onSelectWord(word: string, event: MouseEvent) {
    this.setCardPosition({ top: event.clientY, left: event.clientX });
    this.selectedWord.emit(word);
    this.translateService.getWordsInfo(word);
    this.cardService.showCard(word, {
      template: this.cardTemplate,
      context: { result: this.wordDetails },
    });
  }

  setCardPosition(position: { top: number; left: number }) {
    const cardWidth = window.innerWidth * 0.35;
    const cardHeight = window.innerHeight * 0.8;

    let left: number = position.left;
    let top: number = position.top;
    let right: number = 0;
    let bottom: number = 0;

    if (position.left + cardWidth > window.innerWidth - 100) {
      right = window.innerWidth - position.left;
      left = 0;
    }

    if (position.top + cardHeight > window.innerHeight - 50) {
      bottom = 10;
      top = 0;
    }

    if (left !== 0 && left < 10) left = 10;
    if (top !== 0 && top < 10) top = 10;
    if (right !== 0 && right < 10) right = 10;
    if (bottom !== 0 && bottom < 10) bottom = 10;

    this.clickedPosition = { top, left, right, bottom };
  }

  getAllExamples(result: any) {
    if (!result?.translates) return [];
    const examples: any[] = [];
    result.translates.forEach((t: any) => {
      t.vocab?.data?.definitions?.forEach((def: any) => {
        if (def.examples) {
          examples.push(...def.examples);
        }
      });
    });
    return examples;
  }
}
