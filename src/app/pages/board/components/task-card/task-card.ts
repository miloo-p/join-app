import { Component, Input, Inject } from '@angular/core';
import {tasksService} from "../../../../shared/services/tasks-service";

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  @Input() task: any;

  dbTasks = Inject(tasksService);

  constructor() {
    const tasks = this.dbTasks.getTasks();
    console.log(tasks);
  }
}
