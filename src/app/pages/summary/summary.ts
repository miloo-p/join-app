import { Component, computed, inject, OnInit } from '@angular/core';
import { tasksService } from '../../shared/services/tasks-service';

@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.html',
  styleUrl: './summary.scss',
})
export class Summary implements OnInit {
  private tasksService = inject(tasksService);

  todoTasksCount = computed(() => {
    return this.tasksService.tasks().filter(task => task.status === 0).length;
  });

  progressTasksCount = computed(() => {
    return this.tasksService.tasks().filter(task => task.status === 1).length;
  });

  feedbackTasksCount = computed(() => {
    return this.tasksService.tasks().filter(task => task.status === 2).length;
  });

  doneTasksCount = computed(() => {
    return this.tasksService.tasks().filter(task => task.status === 3).length;
  });

  tasksInBoard = computed(() => {
    return this.todoTasksCount() + this.progressTasksCount() + this.feedbackTasksCount();
  });

  async ngOnInit(): Promise<void> {
    await this.tasksService.getTasks();
    await this.tasksService.subscribeToTasks();
  }
}
