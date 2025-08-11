import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import {
  Component,
  effect,
  input,
  Output,
  EventEmitter,
  signal,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-word-highlight',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './word-highlight.component.html',
  styleUrl: './word-highlight.component.scss',
})
export class WordHighlightComponent {
  http = inject(HttpClient);

  textToProcess = input<string>('');
  @Output() selectedWord = new EventEmitter<string>();
  lines = signal<{ line: number; words: string[] }[]>([]);

  constructor() {
    effect(() => this.processText(), { allowSignalWrites: true });
  }

  processText() {
    const inputText = this.textToProcess();
    const lines = inputText
      .split('\n')
      .map((line, idx) => {
        const words = line.trim().split(/\s+/);
        return { line: idx + 1, words };
      })
      .filter((line) => line.words.length > 0);

    this.lines.set(lines);
  }

  onSelectWord(word: string) {
    this.selectedWord.emit(word);
    // this.http
    //   .get(
    //     `/api/_next/data/EQd-Wpmr1jGk8WWBnaLJ7/fa/woerterbuch/deutsch-persisch/${word}.json?slug=${word}`
    //   )
    //   .subscribe({
    //     next: (res: any) => {
    //       res.pageProps.vocab
    //         ? alert(
    //             res.pageProps.vocab.data.definitions[0].title
    //               ? res.pageProps.vocab.data.definitions[0].title
    //               : res.pageProps.vocab.data.title +
    //                   ' ' +
    //                   res.pageProps.vocab.data.definitions[0].details
    //           )
    //         : this.http
    //             .get(
    //               `/api/_next/data/EQd-Wpmr1jGk8WWBnaLJ7/fa/woerterbuch/deutsch-persisch/${
    //                 word.charAt(0).toUpperCase() + word.slice(1)
    //               }.json?slug=${word}`
    //             )
    //             .subscribe({
    //               next: (res: any) => {
    //                 res.pageProps.vocab
    //                   ? alert(
    //                       res.pageProps.vocab.data.type +
    //                         '' +
    //                         res.pageProps.vocab.data.definitions[0].title
    //                     )
    //                   :
                       this.http
                          .get(
                            `http://localhost:3000/api/search/cons?q=${word}`
                          )
                          .subscribe({
                            next: (result: any) => {
                              alert(result.verb);
                              console.log('Response:', result);
                            },
                            error: (err) => {
                              console.error('Error:', err);
                            },
                          });
      //             },
      //           });
      //   },
      // });
    // });
  }
}
