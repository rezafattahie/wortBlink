import { TestBed } from '@angular/core/testing';

import { WordService } from './word.service';

describe('WordService', () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should change umlauts', () => {
    // LOWERCASE UMLAUTS
    expect(service.replaceUmlauts('für')).toBe('fuer');
    expect(service.replaceUmlauts('mädchen')).toBe('maedchen');
    expect(service.replaceUmlauts('könig')).toBe('koenig');
    // UPPERCASE UMLAUTS
    expect(service.replaceUmlauts('Über')).toBe('Ueber');
    expect(service.replaceUmlauts('Äpfel')).toBe('Aepfel');
    expect(service.replaceUmlauts('Östereich')).toBe('Oestereich');
  });

  it("should not change, becouse doesn't included umlaut", () => {
    expect(service.replaceUmlauts('Hello world')).toBe('Hello world');
  });

    it("should not change, becouse of empty string", () => {
    expect(service.replaceUmlauts('')).toBe('');
  });
});