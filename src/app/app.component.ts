import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SorceInputComponent } from "./components/sorce-input/sorce-input.component";
import { WordHighlightComponent } from "./components/word-highlight/word-highlight.component";
import { WordListComponent } from "./components/word-list/word-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SorceInputComponent, WordHighlightComponent, WordListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wortBlink';
}
