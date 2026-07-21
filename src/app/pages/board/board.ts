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
import { BreakpointObserver } from '@angular/cdk/layout';
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
  breakpointObserver = inject(BreakpointObserver);

  isDragging = false;
  isDragDisabled = false;

  searchQuery: string = '';

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

    this.breakpointObserver.observe(['(max-width: 1300px)']).subscribe((result) => {
      this.isDragDisabled = result.matches;
      this.cdr.markForCheck();
    });
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value.toLowerCase();
    this.syncBoardWithDatabase();
  }

  private syncBoardWithDatabase() {
    const allDbTasks = this.dbTasks.tasks();

    if (this.isDragging) return;

    const filteredTasks = allDbTasks.filter((t) => {
      const matchesTitle = t.title?.toLowerCase().includes(this.searchQuery) ?? false;
      const matchesDesc = t.desc?.toLowerCase().includes(this.searchQuery) ?? false;

      return matchesTitle || matchesDesc;
    });

    this.boardColumns[0].tasks = filteredTasks.filter((t) => t.status === 0);
    this.boardColumns[1].tasks = filteredTasks.filter((t) => t.status === 1);
    this.boardColumns[2].tasks = filteredTasks.filter((t) => t.status === 2);
    this.boardColumns[3].tasks = filteredTasks.filter((t) => t.status === 3);

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
