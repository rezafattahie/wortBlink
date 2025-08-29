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
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

import { TranslateService } from '../../services/translate.service';
import { wordInfoSignal } from '../../signal-store/wordInfo.signal-store';
import { CardComponent } from '../card/card.component';
import { CardService } from '../../services/card.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@Component({
  selector: 'app-word-highlight',
  standalone: true,
  imports: [CardComponent, CdkDrag, CdkDropList, VideoPlayerComponent],
  templateUrl: './word-highlight.component.html',
  styleUrl: './word-highlight.component.scss',
})
export class WordHighlightComponent {
  translateService = inject(TranslateService);
  cardService = inject(CardService);

  textToProcess = input<string>('');
  hoverTranslate = signal<string>('Translating...');
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

  drop(event: CdkDragDrop<{ line: number; words: string[] }, any, string>) {
    this.hoverTranslate.set('');
    const draggedWord = event.item.data.replace(/[^a-zA-Z0-9äöüÄÖÜß]+$/g, '');

    let clientX = 0;
    let clientY = 0;

    if (event.event instanceof MouseEvent) {
      clientX = event.event.clientX;
      clientY = event.event.clientY;
    } else if (event.event instanceof TouchEvent) {
      clientX = event.event.touches[0].clientX;
      clientY = event.event.touches[0].clientY;
    }

    const targetEl = document.elementFromPoint(clientX, clientY);
    const targetSpan = targetEl?.closest('.text-process__word') as HTMLElement;
    if (!targetSpan) return;

    const targetWord = targetSpan.innerText
      .trim()
      .replace(/[^a-zA-Z0-9äöüÄÖÜß]+$/g, '');
    if (!draggedWord || !targetWord || draggedWord === targetWord) return;

    const mergedWord = targetWord + draggedWord;

    const trimmedWord = mergedWord.replace(/[^a-zA-Z0-9äöüÄÖÜß]+$/g, '');
    this.setCardPosition({ top: clientY, left: clientX });
    this.selectedWord.emit(trimmedWord);
    this.translateService.getWordsInfo(trimmedWord);
    this.cardService.showCard(trimmedWord, {
      template: this.cardTemplate,
      context: { result: this.wordDetails },
    });
  }

  onSelectWord(word: string, event: MouseEvent) {
    this.hoverTranslate.set('');
    const trimmedWord = word.replace(/[^a-zA-Z0-9äöüÄÖÜß]+$/g, '');
    this.setCardPosition({ top: event.clientY, left: event.clientX });
    this.selectedWord.emit(trimmedWord);
    this.translateService.getWordsInfo(trimmedWord);
    this.cardService.showCard(trimmedWord, {
      template: this.cardTemplate,
      context: { result: this.wordDetails },
    });
  }

  setCardPosition(position: { top: number; left: number }) {
    const cardWidth = window.innerWidth * (this.hoverTranslate() ? 0.3 : 0.35);
    const cardHeight = window.innerHeight * (this.hoverTranslate() ? 0.1 : 0.8);

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

  getHoverTranslation(word: string, event: MouseEvent) {
    this.setCardPosition({ top: event.clientY, left: event.clientX });
    this.translateService.getHoverTranslation(word).subscribe({
      next: (result: any) => {
        this.hoverTranslate.set(
          (result.data.hoverDictEntries as string[]).join(' ، ')
        );
        this.cardService.showCard('', {
          template: this.cardTemplate,
          context: { result: this.hoverTranslate },
        });
      },
    });
  }
}
