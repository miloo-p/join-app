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
}
