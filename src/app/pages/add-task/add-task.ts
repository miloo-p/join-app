import { Component, ViewChild, inject } from '@angular/core';
import { AddTaskBasicInfo } from './component/add-task-basic-info/add-task-basic-info';
import { AddTaskDetailInfo } from './component/add-task-detail-info/add-task-detail-info';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { tasksService } from '../../shared/services/tasks-service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [AddTaskBasicInfo, AddTaskDetailInfo, ButtonComponent, ReactiveFormsModule,],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {

  private tasksService = inject(tasksService);

  @ViewChild(AddTaskDetailInfo) detailInfo!: AddTaskDetailInfo;

  addTaskForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
    }),
    dueDate: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    assignedTo: new FormControl<number[]>([], {
      nonNullable: true,
    }),
    category: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    priority: new FormControl<'urgent' | 'medium' | 'low'>('medium', {
      nonNullable: true,
    }),
    subtasks: new FormControl<{ id: number; name: string }[]>([], {
      nonNullable: true,
    }),
  });

  clearTaskForm(): void {
    this.addTaskForm.reset({
      title: '',
      description: '',
      dueDate: '',
      assignedTo: [],
      category: '',
      priority: 'medium',
      subtasks: [],
    });
    this.detailInfo.clearDetailInfo();
  }

  private mapFormToTaskPayload() {
    const formValue = this.addTaskForm.getRawValue();

    return {
      title: formValue.title,
      desc: formValue.description,
      due_date: formValue.dueDate,
      status: 0,
      priority: this.mapPriorityToNumber(formValue.priority),
      collaborators: [0, 1],
      subtasks: formValue.subtasks.map((subtask) => ({
        name: subtask.name,
        status: 0,
      })),
      category: this.mapCategoryToNumber(formValue.category),
    };
  }

  private mapCategoryToNumber(category: string): number {
    return category === 'user_story' ? 1 : 0;
  }

  private mapPriorityToNumber(priority: 'urgent' | 'medium' | 'low'): number {
    if (priority === 'urgent') {
      return 2;
    }

    if (priority === 'medium') {
      return 1;
    }

    return 0;
  }

  async createTask(): Promise<void> {
    if (this.addTaskForm.invalid) {
      this.addTaskForm.markAllAsTouched();
      return;
    }

    const taskPayload = this.mapFormToTaskPayload();

    await this.tasksService.setTask([taskPayload]);

    this.clearTaskForm();
  }
}
