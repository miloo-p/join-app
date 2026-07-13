import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task-basic-info',
  imports: [FormsModule,],
  templateUrl: './add-task-basic-info.html',
  styleUrl: './add-task-basic-info.scss',
})
export class AddTaskBasicInfo {
  today = new Date().toISOString().split('T')[0];
  dueDate = '';

  formatDateForDisplay(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  openDatePicker(input: HTMLInputElement): void {
    input.showPicker();
  }
}
