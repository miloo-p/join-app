import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class ButtonComponent {
  text = input.required<string>(); 
  variant = input<'primary' | 'secondary' | 'outline'>('primary'); 
  btnClick = output<void>();

  onButtonClick(): void {
    this.btnClick.emit();
  }
}
