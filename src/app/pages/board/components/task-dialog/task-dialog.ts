import { Component, ElementRef, ViewChild } from '@angular/core';
import { AddTask } from '../../../add-task/add-task';
import { Task } from '../../../../shared/interfaces/tasks';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [AddTask],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialog {
  @ViewChild('dialog') dialog!: ElementRef<HTMLDialogElement>;

  currentTask: Task | null = null;

  openDialog(data: { columnId?: string; task?: Task }) {
    if (data.task) {
      this.currentTask = data.task;
    } else {
      this.currentTask = null;
    }

    this.dialog.nativeElement.showModal();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
    setTimeout(() => {
      this.currentTask = null;
    }, 300);
  }
}
