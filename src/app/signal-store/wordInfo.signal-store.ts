import { signal } from '@angular/core';
import { ICons } from '../models/cons.interface';
import { IVocab } from '../models/vocab.interface';
import { IDaily } from '../models/daily.interface.ts';
import { IPhrase } from '../models/phraseinterface';
import { ITranslate } from '../models/translate.interface';

export const wordInfoSignal = signal<{
  cons?: ICons;
  vocabs?: IVocab;
  dailys?: IDaily;
  phrases?: IPhrase;
  translate?: ITranslate;
} | null>(null);
