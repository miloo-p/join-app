import { Component, Input, inject, OnInit } from '@angular/core';
import { tasksService } from '../../../../shared/services/tasks-service';
import { Task } from '../../../../shared/interfaces/tasks';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.html',
  styleUrls: ['./task-card.scss'],
})

export class TaskCard implements OnInit {
  @Input() task?: Task;

  dbTasks = inject(tasksService);

  async ngOnInit() {
    await this.dbTasks.getTasks();
    const tasks = this.dbTasks.tasks();

    await this.dbTasks.setTask([
      {
      title: "Zimmer aufräumen",
      desc: "Schön ordentlich",
      due_date: "2023-12-31",
      status: 1,
      priority: 1,
      subtasks:[{name: "Bett machen", status: 0}],
      collaborators:[1,2],
      category: 1,
      }
    ])
  }
}
