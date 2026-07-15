import { Component, Input, inject, OnInit } from '@angular/core';
import { tasksService } from '../../../../shared/services/tasks-service';
import { Task } from '../../../../shared/interfaces/tasks';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  @Input() task?: Task;

  dbTasks = inject(tasksService);

  async ngOnInit() {
    await this.dbTasks.getTasks();
    const tasks = this.dbTasks.tasks();
    console.log(tasks[0]?.category);
  }
}
