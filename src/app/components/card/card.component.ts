import { Component, inject } from '@angular/core';

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

  close() {
    this.cardService.hideCard();
  }
}
