import { Component, effect, inject, input, signal } from '@angular/core';

import { CardService } from '../../services/card.service';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  private cardService = inject(CardService);

  visible = this.cardService.visible;
  title = this.cardService.title;
  data = this.cardService.data;
  position = input<{
    top: number;
    left: number;
    right: number;
    bottom: number;
  }>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  UpdatedPosition = signal<{
    top: number;
    left: number;
    right: number;
    bottom: number;
  }>(this.position());

  constructor() {
    effect(
      () => {
        this.UpdatedPosition.set(this.position());
      },
      { allowSignalWrites: true }
    );
  }

  close() {
    this.cardService.hideCard();
  }
}
