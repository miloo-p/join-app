import { Component, ViewChild } from '@angular/core';
import { TaskCard } from './components/task-card/task-card';
import { TaskOverlay } from './components/task-overlay/task-overlay';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TaskDialog } from './components/task-dialog/task-dialog';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TaskCard, TaskOverlay, TaskDialog, ButtonComponent],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {
  todoTasks: any[] = [];
  progressTasks: any[] = [];
  feedbackTasks: any[] = [];
  doneTasks: any[] = [];

  boardColumns = [
    {
      id: 'todo',
      title: 'To do',
      tasks: this.todoTasks,
      emptyText: 'No tasks to do',
      hasAddBtn: true,
    },
    {
      id: 'progress',
      title: 'In progress',
      tasks: this.progressTasks,
      emptyText: 'No tasks in progress',
      hasAddBtn: true,
    },
    {
      id: 'feedback',
      title: 'Await feedback',
      tasks: this.feedbackTasks,
      emptyText: 'No tasks awating feedback',
      hasAddBtn: true,
    },
    {
      id: 'done',
      title: 'Done',
      tasks: this.doneTasks,
      emptyText: 'No tasks done',
      hasAddBtn: false,
    },
  ];

  openAddTaskDialog(status: string) {
    console.log('Spalte:', status);
  }

  @ViewChild('taskOverlay') taskOverlay!: TaskOverlay;

  openTaskDetails(task: any) {
    console.log('Folgender Task wurde geklickt:', task);
    this.taskOverlay.openDialog(task);
  }
}
