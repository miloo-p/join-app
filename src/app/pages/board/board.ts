import { Component, OnInit, inject, ViewChild, effect, ChangeDetectorRef } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  CdkDropListGroup,
  transferArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { TaskCard } from './components/task-card/task-card';
import { TaskDetail } from './components/task-detail/task-detail';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TaskDialog } from './components/task-dialog/task-dialog';
import { tasksService } from '../../shared/services/tasks-service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    TaskCard,
    TaskDetail,
    TaskDialog,
    ButtonComponent,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
  ],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board implements OnInit {
  dbTasks = inject(tasksService);
  cdr = inject(ChangeDetectorRef);

  isDragging = false;

  boardColumns = [
    {
      id: 'todo',
      title: 'To do',
      tasks: [] as any[],
      emptyText: 'No tasks to do',
      hasAddBtn: true,
    },
    {
      id: 'progress',
      title: 'In progress',
      tasks: [] as any[],
      emptyText: 'No tasks in progress',
      hasAddBtn: true,
    },
    {
      id: 'feedback',
      title: 'Await feedback',
      tasks: [] as any[],
      emptyText: 'No tasks awating feedback',
      hasAddBtn: true,
    },
    { id: 'done', title: 'Done', tasks: [] as any[], emptyText: 'No tasks done', hasAddBtn: false },
  ];

  @ViewChild('taskDetail') TaskDetail!: TaskDetail;
  @ViewChild('addTaskDialog') addTaskDialog!: TaskDialog;

  constructor() {
    effect(() => {
      this.syncBoardWithDatabase();
    });
  }

  private syncBoardWithDatabase() {
    const allDbTasks = this.dbTasks.tasks();

    if (this.isDragging) return;

    this.boardColumns[0].tasks = allDbTasks.filter((t) => t.status === 0);
    this.boardColumns[1].tasks = allDbTasks.filter((t) => t.status === 1);
    this.boardColumns[2].tasks = allDbTasks.filter((t) => t.status === 2);
    this.boardColumns[3].tasks = allDbTasks.filter((t) => t.status === 3);

    this.cdr.markForCheck();
  }

  async ngOnInit() {
    await this.dbTasks.getTasks();
    await this.dbTasks.subscribeToTasks();
  }

  openAddTaskDialog(status: string) {
    this.addTaskDialog.openDialog({ columnId: status });
  }

  openTaskDetails(task: any) {
    this.TaskDetail.openDialog(task);
  }

  openEditTaskDialog(taskToEdit: any) {
    this.addTaskDialog.openDialog({ task: taskToEdit });
  }

  drop(event: CdkDragDrop<any[]>, newColumnId: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const taskToMove = event.item.data;

      let newStatus = 0;
      switch (newColumnId) {
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

      taskToMove.status = newStatus;
      this.dbTasks.updateTask(taskToMove);
    }

    setTimeout(() => {
      this.isDragging = false;
    }, 500);
  }
}
