import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor() {}

  replaceUmlauts(word: string): string {
    const map: Record<string, string> = {
      ü: 'ue',
      ö: 'oe',
      ä: 'ae',
      Ü: 'Ue',
      Ö: 'Oe',
      Ä: 'Ae',
    };
    
    const regex = /[üöäÜÖÄ]/g;

    return word.replace(regex, (ch) => map[ch] ?? ch);
  }
}
