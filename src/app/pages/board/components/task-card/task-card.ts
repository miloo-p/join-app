import { Component, Input, inject, OnInit } from '@angular/core';
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

  dbTasks = inject(tasksService);

  constructor() {
  }
  
  async ngOnInit() {
    await this.dbTasks.getTasks();
    const tasks = this.dbTasks.tasks();
    console.log(tasks[0]?.category);
  }
}
