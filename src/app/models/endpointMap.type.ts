import { ICons } from './cons.interface';
import { IDaily } from './daily.interface.ts';
import { IPhrase } from './phraseinterface';
import { IVocab } from './vocab.interface';

export type EndpointMap = {
  cons: ICons;
  vocab: IVocab[];
  phrase: IPhrase[];
  daily: IDaily[];
};
