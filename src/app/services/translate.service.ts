import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  http = inject(HttpClient);
  endpoints = ['cons', 'vocab', 'phrase', 'daily'];
  constructor() {}

  getWordsInfo(word: string) {
    const requests = this.endpoints.map((endpoint) =>
      this.http.get<any>(
      // cons | vocab | phrase | daily
        `http://localhost:3000/api/search/${endpoint}?q=${word}`
      )
    );
    forkJoin(requests).subscribe({
      next: (results) => {
        return results.forEach((result, i) => {
          console.log(`${this.endpoints[i]}:`, result);
          if (this.endpoints[i] === 'vocab') {
            this.getTranslation(result[0].slug, result[0].title).subscribe({
              next: (result) => console.log(result),
            });
          }
        });
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
  }

  getTranslation(slug: string, word: string) {
    return this.http.get(
      `/api/_next/data/EQd-Wpmr1jGk8WWBnaLJ7/fa/woerterbuch/deutsch-persisch/${slug}.json?slug=${word}`
    );
  }
}
