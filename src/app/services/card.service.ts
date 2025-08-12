import { Injectable, TemplateRef, computed, signal } from '@angular/core';

import { IModal } from '../models/modal.iterface';

@Injectable({ providedIn: 'root' })
export class CardService {
  private _state = signal<IModal>({
    visible: false,
  });

  // expose computed signals
  readonly visible = computed(() => this._state().visible);
  readonly title = computed(() => this._state().title);
  readonly data = computed(() => this._state().data);

  showCard(
    title: string,
    data: {
      template: TemplateRef<any>;
      context: any;
    }
  ) {
    this._state.set({ visible: true, title: title, data: data });
  }

  hideCard() {
    this._state.update((state) => ({ ...state, visible: false }));
  }

  toggleCard() {
    this._state.update((state) => ({ ...state, visible: !state.visible }));
  }

  get dataValue() {
    return this._state().data;
  }
}
