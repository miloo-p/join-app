import { Component, inject, Input, OnInit } from '@angular/core';
import { Task } from '../../../../shared/interfaces/tasks';
import { tasksService } from '../../../../shared/services/tasks-service';
import { contactsService } from '../../../../shared/services/contacts-service';
import { ProfileIcon } from '../../../../shared/components/profile-icon/profile-icon';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [ProfileIcon],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard implements OnInit {
  @Input() task?: Task;

  dbTasks = inject(tasksService);
  dbContacts = inject(contactsService);

  availableColors: string[] = [
    'var(--clr-user-tangerine)',
    'var(--clr-user-flamingo)',
    'var(--clr-user-iris)',
    'var(--clr-user-amethyst)',
    'var(--clr-user-sky)',
    'var(--clr-user-mint)',
    'var(--clr-user-salmon)',
    'var(--clr-user-apricot)',
    'var(--clr-user-fuchsia)',
    'var(--clr-user-sunflower)',
    'var(--clr-user-cobalt)',
    'var(--clr-user-lime)',
    'var(--clr-user-lemon)',
    'var(--clr-user-cherry)',
    'var(--clr-user-marigold)',
  ];

  async ngOnInit() {
    await this.dbTasks.getTasks();
    await this.dbContacts.getContacts();
  }

  get assignedContacts() {
    if (!this.task || !this.task.collaborators || this.task.collaborators.length === 0) {
      return [];
    }

    const allContacts = this.dbContacts.contacts();

    return this.task.collaborators
      .map((id) => {
        const contact = allContacts.find((c) => c.id === id);
        if (!contact) return undefined;

        const firstLetter = contact.firstname?.charAt(0).toUpperCase() || '';
        const lastLetter = contact.lastname?.charAt(0).toUpperCase() || '';
        const colorIndex =
          (contact.firstname.length + contact.lastname.length) % this.availableColors.length;

        return {
          ...contact,
          initials: `${firstLetter}${lastLetter}`,
          avatarColor: this.availableColors[colorIndex],
        };
      })
      .filter((contact) => contact !== undefined);
  }

  get visibleContacts() {
    const contacts = this.assignedContacts;
    if (contacts.length <= 4) {
      return contacts;
    }
    return contacts.slice(0, 3);
  }

  get extraContactsCount() {
    const contacts = this.assignedContacts;
    return contacts.length > 4 ? contacts.length - 3 : 0;
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
    return this.task.subtasks.filter((subtask) => subtask.status === 1).length;
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
