import { Component, ViewChild, inject, Input, OnChanges, AfterViewInit, output, OnInit } from '@angular/core';
import { AddTaskBasicInfo } from './component/add-task-basic-info/add-task-basic-info';
import { AddTaskDetailInfo } from './component/add-task-detail-info/add-task-detail-info';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { tasksService } from '../../shared/services/tasks-service';
import { Task } from '../../shared/interfaces/tasks';
import { contactsService } from '../../shared/services/contacts-service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [AddTaskBasicInfo, AddTaskDetailInfo, ButtonComponent, ReactiveFormsModule,],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask implements OnChanges, AfterViewInit, OnInit {

  private tasksService = inject(tasksService);

  private contactDatabase = inject(contactsService);

  private viewInitialized = false;

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

    assignedTo: new FormControl<{ id: number; name: string }[]>([], {
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

  taskSaved = output<void>();

  /** Resets the task form and clears local child component state. */
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
    this.detailInfo?.clearDetailInfo();
  }

  /** Maps form values to the task payload expected by the database. */
  private mapFormToTaskPayload() {
    const formValue = this.addTaskForm.getRawValue();

    return {
      title: formValue.title,
      desc: formValue.description,
      due_date: formValue.dueDate,
      status: 0,
      priority: this.mapPriorityToNumber(formValue.priority),
      collaborators: formValue.assignedTo.map((contact) => contact.id),
      subtasks: formValue.subtasks.map((subtask) => ({
        name: subtask.name,
        status: 0,
      })),
      category: this.mapCategoryToNumber(formValue.category),
    };
  }

  /** Converts the selected category label to its database value. */
  private mapCategoryToNumber(category: string): number {
    return category === 'User Story' ? 1 : 0;
  }

  /** Converts the selected priority label to its database value. */
  private mapPriorityToNumber(priority: 'urgent' | 'medium' | 'low'): number {
    if (priority === 'urgent') {
      return 2;
    }

    if (priority === 'medium') {
      return 1;
    }

    return 0;
  }

  /** Validates, saves, and clears the task form. */
  async createTask(): Promise<void> {
    if (this.addTaskForm.invalid) {
      this.addTaskForm.markAllAsTouched();
      return;
    }

    const taskPayload = this.mapFormToTaskPayload();

    if (this.task?.id) {
      await this.tasksService.updateTask({
        ...taskPayload,
        id: this.task.id,
      });
    } else {
      await this.tasksService.setTask([taskPayload]);
    }

    this.clearTaskForm();
    this.taskSaved.emit();
  }

  @Input() task: Task | null = null;

  async ngOnInit(): Promise<void> {
    await this.contactDatabase.getContacts();

    if (this.task) {
      this.patchTaskToForm();
    }
  }

  ngOnChanges(): void {
    if (!this.task) {
      this.clearTaskForm();
      return;
    }

    this.patchTaskToForm();

    if (this.viewInitialized) {
      this.detailInfo?.loadSubtasks(this.task.subtasks || []);
    }
  }

  private patchTaskToForm(): void {
    if (!this.task) {
      return;
    }

    this.addTaskForm.patchValue({
      title: this.task.title,
      description: this.task.desc,
      dueDate: this.task.due_date.split('T')[0],
      assignedTo: this.mapCollaboratorIdsToContacts(this.task.collaborators || []),
      category: this.mapCategoryFromNumber(this.task.category),
      priority: this.mapPriorityFromNumber(this.task.priority),
      subtasks: this.task.subtasks?.map((subtask, index) => ({
        id: index + 1,
        name: subtask.name,
      })) || [],
    });

    if (this.viewInitialized) {
      this.detailInfo?.loadSubtasks(this.task.subtasks || []);
    }
  }

  private mapCollaboratorIdsToContacts(collaboratorIds: number[]) {
    return collaboratorIds
      .map((id) => {
        const contact = this.contactDatabase.contacts().find(contact => contact.id === id);

        if (!contact || contact.id === undefined) {
          return null;
        }

        return {
          id: contact.id,
          firstname: contact.firstname,
          lastname: contact.lastname,
          name: `${contact.firstname} ${contact.lastname}`,
        };
      })
      .filter((contact): contact is { id: number; firstname: string; lastname: string; name: string } => contact !== null);
  }

  private mapCategoryFromNumber(category: number): string {
    return category === 0 ? 'User Story' : 'Technical Task';
  }

  private mapPriorityFromNumber(priority: number): 'urgent' | 'medium' | 'low' {
    if (priority === 2) {
      return 'urgent';
    }

    if (priority === 1) {
      return 'medium';
    }

    return 'low';
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;

    if (this.task?.subtasks) {
      this.detailInfo?.loadSubtasks(this.task.subtasks);
    }
  }
}
