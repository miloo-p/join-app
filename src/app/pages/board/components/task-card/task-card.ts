import { Component, inject, Input, OnInit } from '@angular/core';
import { Task } from '../../../../shared/interfaces/tasks';
import { tasksService } from '../../../../shared/services/tasks-service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard implements OnInit {
  @Input() task?: Task;

  dbTasks = inject(tasksService);

  async ngOnInit() {
    await this.dbTasks.getTasks();
  }

  getAvailableTargetColumns(currentStatus: number) {
    const columns = [
      { id: 'todo', title: 'To-do', status: 0 },
      { id: 'progress', title: 'In progress', status: 1 },
      { id: 'feedback', title: 'Await feedback', status: 2 },
      { id: 'done', title: 'Done', status: 3 },
    ];
    return columns.filter((col) => col.status !== currentStatus);
  }

  moveTaskTo(task: any, targetColumnId: string) {
    if (!task) return;

    let newStatus = 0;
    switch (targetColumnId) {
      case 'todo':
        newStatus = 0;
        break;
      case 'progress':
        newStatus = 1;
        break;
      case 'feedback':
        newStatus = 2;
        break;
      case 'done':
        newStatus = 3;
        break;
    }

    task.status = newStatus;
    this.dbTasks.updateTask(task);

    const popover = document.getElementById('move-popover-' + task.id);
    if (popover) {
      (popover as any).hidePopover();
    }
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
