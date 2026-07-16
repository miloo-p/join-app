import { Component, ViewChild } from '@angular/core';
import { AddTaskBasicInfo } from './component/add-task-basic-info/add-task-basic-info';
import { AddTaskDetailInfo } from './component/add-task-detail-info/add-task-detail-info';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [AddTaskBasicInfo, AddTaskDetailInfo, ButtonComponent, ReactiveFormsModule, ],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {

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

  createTask(): void {
    if (this.addTaskForm.invalid) {
      this.addTaskForm.markAllAsTouched();
      return;
    }

    const task = this.addTaskForm.getRawValue();

    console.log(task);

    // später:
    // await this.supabaseService.createTask(task);
  }
}
