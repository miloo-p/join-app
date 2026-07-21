import { Component, inject, Input } from '@angular/core';
import { Task } from '../../../../shared/interfaces/tasks';
import { tasksService } from '../../../../shared/services/tasks-service';

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

    // await this.dbTasks.setTask([
    //   {
    //   title: "Zimmer aufräumen",
    //   desc: "Schön ordentlich",
    //   due_date: "2023-12-31",
    //   status: 1,
    //   priority: 1,
    //   subtasks:[{name: "Bett machen", status: 0}],
    //   collaborators:[1,2],
    //   category: 1,
    //   }
    // ])
  }

  /**
   * Counts how many subtasks have a status of 1 (completed).
   * @returns {number} The total number of completed subtasks.
   */
  getCompletedSubtasksCount(): number {
    if (!this.task?.subtasks) return 0;
    return this.task.subtasks.filter(subtask => subtask.status === 1).length;
  }

  /**
   * Calculates the percentage of completed subtasks for the progress bar width.
   * @returns {number} The completion percentage between 0 and 100.
   */
  getCompletionPercentage(): number {
    if (!this.task?.subtasks || this.task.subtasks.length === 0) return 0;
    const completed = this.getCompletedSubtasksCount();
    return (completed / this.task.subtasks.length) * 100;
  }
}
