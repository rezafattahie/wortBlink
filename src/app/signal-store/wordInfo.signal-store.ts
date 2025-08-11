import { signal } from '@angular/core';
import { ITranslate } from '../models/translate.interface';
import { EndpointMap } from '../models/endpointMap.type';

// export const wordInfoSignal = signal<{
//   cons?: ICons;
//   vocabs?: IVocab[];
//   dailys?: IDaily[];
//   phrases?: IPhrase[];
//   translates: ITranslate[];
// }>();



// ساختار state
type WordInfoState = Partial<EndpointMap> & {
  translates: ITranslate[];
};

// signal
export const wordInfoSignal = signal<WordInfoState>({
  translates: []
});