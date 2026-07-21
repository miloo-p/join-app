import { Component, OnInit, inject, ViewChild, computed } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, CdkDropListGroup } from '@angular/cdk/drag-drop';
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

  todoTasks = computed(() => this.dbTasks.tasks().filter((t) => t.status === 0));
  progressTasks = computed(() => this.dbTasks.tasks().filter((t) => t.status === 1));
  feedbackTasks = computed(() => this.dbTasks.tasks().filter((t) => t.status === 2));
  doneTasks = computed(() => this.dbTasks.tasks().filter((t) => t.status === 3));

  @ViewChild('taskDetail') TaskDetail!: TaskDetail;
  @ViewChild('addTaskDialog') addTaskDialog!: TaskDialog;

  async ngOnInit() {
    await this.dbTasks.getTasks();
    await this.dbTasks.subscribeToTasks();
  }

  get boardColumns() {
    return [
      {
        id: 'todo',
        title: 'To do',
        tasks: this.todoTasks(),
        emptyText: 'No tasks to do',
        hasAddBtn: true,
      },
      {
        id: 'progress',
        title: 'In progress',
        tasks: this.progressTasks(),
        emptyText: 'No tasks in progress',
        hasAddBtn: true,
      },
      {
        id: 'feedback',
        title: 'Await feedback',
        tasks: this.feedbackTasks(),
        emptyText: 'No tasks awating feedback',
        hasAddBtn: true,
      },
      {
        id: 'done',
        title: 'Done',
        tasks: this.doneTasks(),
        emptyText: 'No tasks done',
        hasAddBtn: false,
      },
    ];
  }

  openAddTaskDialog(status: string) {
    this.addTaskDialog.openDialog({ columnId: status });
  }

  openTaskDetails(task: any) {
    console.log('Folgender Task wurde geklickt:', task);
    this.TaskDetail.openDialog(task);
  }

  openEditTaskDialog(taskToEdit: any) {
    this.addTaskDialog.openDialog({ task: taskToEdit });
  }

  async drop(event: CdkDragDrop<any[]>, newColumnId: string) {
    if (event.previousContainer !== event.container) {
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

      await this.dbTasks.updateTask(taskToMove);
    }
  }
}
