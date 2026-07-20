import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

type Priority = 'urgent' | 'medium' | 'low';

@Component({
  selector: 'app-prio-selection',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './prio-selection.html',
  styleUrl: './prio-selection.scss',
})
export class PrioSelection {
  @Input({ required: true }) form!: FormGroup;

  selectPriority(priority: Priority): void {
    this.form.patchValue({ priority });
  }

  isPrioritySelected(priority: Priority): boolean {
    return this.form.get('priority')?.value === priority;
  }
}
