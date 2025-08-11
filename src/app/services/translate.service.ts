import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ITranslate } from '../models/translate.interface';
import { EndpointMap } from '../models/endpointMap.type';
import { wordInfoSignal } from '../signal-store/wordInfo.signal-store';
import { IVocab } from '../models/vocab.interface';
import { IDaily } from '../models/daily.interface.ts';
import { IPhrase } from '../models/phraseinterface';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  http = inject(HttpClient);
  endpoints: (keyof EndpointMap)[] = ['cons', 'vocab', 'phrase', 'daily'];

  tranlates?: ITranslate[] = [];
  getWordsInfo(word: string) {
    let newWord = word;
    const requests = this.endpoints.map((endpoint) =>
      this.http.get<EndpointMap[typeof endpoint]>(
        `http://localhost:3000/api/search/${endpoint}?q=${word}`
      )
    );
    forkJoin(requests).subscribe({
      next: (results) => {
        return results.forEach((result, i) => {
          console.log(`${this.endpoints[i]}:`, result);
          const key = this.endpoints[i] as keyof EndpointMap;
          let filtered = result;
          if (key === 'vocab') {
            filtered = (result as IVocab[]).slice(0, 5);
            const vocabTranslations$ = (filtered as IVocab[]).map((vocab) => {
              const consVerb = wordInfoSignal().cons?.verb?.trim();

              return consVerb
                ? this.getTranslation(consVerb, consVerb)
                : this.getTranslation(vocab.slug, vocab.title);
            });

            forkJoin(vocabTranslations$).subscribe((translations) => {
              this.tranlates = translations;
              wordInfoSignal.set({
                ...wordInfoSignal(),
                [key]: filtered as IVocab[],
                translates: this.tranlates,
              });
            });
          } else if (key === 'daily' || key === 'phrase') {
            filtered = (result as IDaily[] | IPhrase[]).slice(0, 2);
            wordInfoSignal.set({
              ...wordInfoSignal(),
              [key]: filtered,
              translates: this.tranlates ?? wordInfoSignal().translates,
            });
          }
          wordInfoSignal.set({
            ...wordInfoSignal(),
            [key]: filtered,
            translates: this.tranlates ?? wordInfoSignal().translates,
          });
        });
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  getTranslation(slug: string, word: string) {
    return this.http
      .get<ITranslate>(
        `/api/_next/data/EQd-Wpmr1jGk8WWBnaLJ7/fa/woerterbuch/deutsch-persisch/${slug}.json?slug=${word}`
      )
      .pipe(
        map((vocab) => {
          return {
            pageProps: {
              vocab: {
                data: vocab.pageProps.vocab.data,
                meta: vocab.pageProps.vocab.meta,
                title: vocab.pageProps.vocab.title,
              },
            },
            __N_SSP: vocab.__N_SSP,
          };
        })
      );
  }
}
