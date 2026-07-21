import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { tasksService } from '../../../../shared/services/tasks-service';
import { contactsService } from '../../../../shared/services/contacts-service';
import { Task } from '../../../../shared/interfaces/tasks';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
})
export class TaskDetail implements OnInit {
  dbTasks = inject(tasksService);
  dbContacts = inject(contactsService);

  @Output() editTask = new EventEmitter<Task>();

  task: Task | null = null;
  isOpen: boolean = false;

  async ngOnInit() {
    await this.dbContacts.getContacts();
  }

  openDialog(task: Task) {
    this.task = task;
    this.isOpen = true;
  }

  closeDialog() {
    this.isOpen = false;
    setTimeout(() => {
      this.task = null;
    }, 300);
  }

  get assignedContacts() {
    if (!this.task || !this.task.collaborators || this.task.collaborators.length === 0) {
      return [];
    }

    const allContacts = this.dbContacts.contacts();
    const badgeColors = ['#1FD7C1', '#462F8A', '#0038FF', '#FF7A00', '#FF5EB3', '#9327FF'];

    return this.task.collaborators
      .map((id) => {
        const contact = allContacts.find((c) => c.id === id);

        if (!contact) return undefined;

        return {
          ...contact,
          fullName: `${contact.firstname} ${contact.lastname}`,
          initials: `${contact.firstname.charAt(0)}${contact.lastname.charAt(0)}`.toUpperCase(),
          color: badgeColors[(contact.id || 0) % badgeColors.length],
        };
      })
      .filter((contact) => contact !== undefined);
  }

  async toggleSubtask(index: number) {
    if (!this.task || !this.task.subtasks) return;
    const currentStatus = this.task.subtasks[index].status;
    this.task.subtasks[index].status = currentStatus === 1 ? 0 : 1;
    await this.dbTasks.updateTask(this.task);
  }

  onEditClick() {
    if (this.task) {
      this.editTask.emit(this.task);
      this.closeDialog();
    }
  }
}
