import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { WordHighlightComponent } from './components/word-highlight/word-highlight.component';
import { WordListComponent } from './components/word-list/word-list.component';
import { LoaderComponent } from "./loader/loader.component";
import { sourceInputComponent } from './components/sorce-input/source-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    sourceInputComponent,
    WordHighlightComponent,
    WordListComponent,
    LoaderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Wort blink';
  textToProcess = '';
  selectedWord = '';

  OnGetText(text: string) {
    this.textToProcess = text;
  }

  OnGetSelectedWord(selectedWord: string) {
    this.selectedWord = selectedWord;
  }
}
