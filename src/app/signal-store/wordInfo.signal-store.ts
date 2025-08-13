import { signal } from '@angular/core';
import { ITranslate } from '../models/translate.interface';
import { EndpointMap } from '../models/endpointMap.type';

export const wordInfoSignal = signal<WordInfoState>({
  translates: [],
});

type WordInfoState = Partial<EndpointMap> & {
  translates: ITranslate[];
};
