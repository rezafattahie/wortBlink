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
  @Output() text = new EventEmitter<string>();


  onInputChange(event: Event) {
  const target = event.target as HTMLElement;
  this.inputText = target.innerText || '';
}
  onTextTransfere() {
    this.toggleSource();
    this.text.emit(this.inputText);   }



  toggleSource() {
    this.showSource = !this.showSource;
  }
}
