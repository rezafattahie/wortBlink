import {
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubtitleService } from '../../services/subtitle.service';

@Component({
  selector: 'app-sorce-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sorce-input.component.html',
  styleUrl: './sorce-input.component.scss',
})
export class SorceInputComponent {
  subtitleService = inject(SubtitleService);
  inputText: string = '';
  showSource = true;
  isListenning = false;
  paddingBottom = '0px';
  listening = signal<{ word: string; sentence: string }>({
    word: '',
    sentence: '',
  });

  @Output() text = new EventEmitter<string>();

  onInputChange(event: Event) {
    const target = event.target as HTMLElement;
    this.inputText = target.innerText || '';

    const firstLineText = this.inputText.split('\n')[0] || '';

    const tempSpan = document.createElement('span');
    const computedStyle = getComputedStyle(target);
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.whiteSpace = 'pre';
    tempSpan.style.font = computedStyle.font;
    tempSpan.textContent = firstLineText;
    document.body.appendChild(tempSpan);

    const textWidth = tempSpan.offsetWidth;
    const boxWidth = target.clientWidth;

    document.body.removeChild(tempSpan);

    if (textWidth >= boxWidth * 0.9) {
      this.paddingBottom = '3rem';
    } else {
      this.paddingBottom = '0px';
    }
  }


  onTextTransfere() {
    this.toggleSource();
    this.text.emit(this.inputText);
  }

  toggleSource() {
    this.showSource = !this.showSource;
  }
  startListening() {
    this.isListenning = !this.isListenning;
    this.subtitleService.start(
      (finalText) => {
        // the whole sentence
        this.listening.update((val) => ({
          ...val,
          sentence: val.sentence + ' ' + finalText,
        }));
        this.inputText = this.listening().sentence;
        console.log('Final:', finalText);
      },
      (partialText) => {
        // momental text
        this.listening.update((val) => ({
          ...val,
          word: partialText,
        }));
        console.log('Partial:', partialText);
      }
    );
  }

  stopListening() {
    this.isListenning = !this.isListenning;
    this.subtitleService.stop();
  }
}
