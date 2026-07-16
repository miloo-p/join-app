import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    '[class.full-width-host]': 'isFullWidthClass()'
  }
})
export class ButtonComponent {
  text = input.required<string>();
  variant = input<'primary' | 'secondary' | 'outline'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  width = input<'auto' | 'full'>('auto');
  buttonType = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  fontWeight = input<'regular' | 'bold'>('bold');

  isFullWidth = input<boolean>(false);

  isFullWidthClass = computed(() => this.width() === 'full' || this.isFullWidth());

  btnClick = output<void>();

  onButtonClick(): void {
    if (!this.disabled() && !this.loading()) {
      this.btnClick.emit();
    }
  }
}
