import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-task-basic-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-task-basic-info.html',
  styleUrl: './add-task-basic-info.scss',
})
export class AddTaskBasicInfo {

  @Input({ required: true }) form!: FormGroup;

  today = new Date().toISOString().split('T')[0];

  /** Formats an ISO date string from yyyy-mm-dd to dd/mm/yyyy for display. */
  formatDateForDisplay(date: string): string {
    const dateOnly = date.split('T')[0].split(' ')[0];
    const [year, month, day] = dateOnly.split('-');

    return `${day}/${month}/${year}`;
  }

  /** Opens the native browser date picker for the due date input. */
  openDatePicker(input: HTMLInputElement): void {
    input.showPicker();
  }
}
