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

  formatDateForDisplay(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  openDatePicker(input: HTMLInputElement): void {
    input.showPicker();
  }
}
