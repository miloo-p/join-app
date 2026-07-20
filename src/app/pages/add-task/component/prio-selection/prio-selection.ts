import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

/** Available priority values for a task. */
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

  /** Stores the selected priority in the task form. */
  selectPriority(priority: Priority): void {
    this.form.patchValue({ priority });
  }

  /** Checks whether the given priority is currently selected. */
  isPrioritySelected(priority: Priority): boolean {
    return this.form.get('priority')?.value === priority;
  }
}
