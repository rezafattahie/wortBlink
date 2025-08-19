import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sorce-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sorce-input.component.html',
  styleUrl: './sorce-input.component.scss',
})
export class SorceInputComponent {
  inputText: string = '';
  showSource = true;
  paddingBottom = '0px';
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
}
