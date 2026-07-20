import { Component, Input, ViewChild } from '@angular/core';
import { ContactSelection } from '../contact-selection/contact-selection';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ProfileIcon } from '../../../../shared/components/profile-icon/profile-icon';
import { PrioSelection } from '../prio-selection/prio-selection';
import { AddTaskSubtasks } from '../add-task-subtasks/add-task-subtasks';

type AssignedCollaboratorIcon = {
  id: number;
  firstname: string;
  lastname: string;
  name: string;
};

@Component({
  selector: 'app-add-task-detail-info',
  standalone: true,
  imports: [ContactSelection, ReactiveFormsModule, ProfileIcon, PrioSelection, AddTaskSubtasks],
  templateUrl: './add-task-detail-info.html',
  styleUrl: './add-task-detail-info.scss',
})
export class AddTaskDetailInfo {
  @Input({ required: true }) form!: FormGroup;

  @ViewChild(AddTaskSubtasks) subtaskInfo!: AddTaskSubtasks;

  isContactDropdownOpen = false;
  isCategoryDropwDownOpen = false;

  setAssignedCollaborators(collaborators: { id: number; name: string }[]): void {
    this.form.patchValue({
      assignedTo: collaborators,
    });
  }

  toggleDropdown(): void {
    this.isContactDropdownOpen = !this.isContactDropdownOpen;
    if (this.isCategoryDropwDownOpen === true) {
      this.isCategoryDropwDownOpen = false;
    }
  }

  toggleDropdownCategory(): void {
    this.isCategoryDropwDownOpen = !this.isCategoryDropwDownOpen;
    if (this.isContactDropdownOpen === true) {
      this.isContactDropdownOpen = false;
    }
  }

  getCategory(text: string): void {
    this.form.patchValue({ category: text });
    this.isCategoryDropwDownOpen = false;
  }

  clearDetailInfo(): void {
    this.isContactDropdownOpen = false;
    this.isCategoryDropwDownOpen = false;
    this.subtaskInfo?.clearSubtasks();
  }

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
    'var(--clr-user-marigold)'
  ];

  getSelectedContacts(): AssignedCollaboratorIcon[] {
    return this.form.get('assignedTo')?.value || [];
  }

  getProfileData(contact: AssignedCollaboratorIcon) {
    const firstLetter = contact.firstname?.charAt(0).toUpperCase() || '';
    const lastLetter = contact.lastname?.charAt(0).toUpperCase() || '';
    const colorIndex = (contact.firstname.length + contact.lastname.length) % this.availableColors.length;

    return {
      initials: `${firstLetter}${lastLetter}`,
      avatarColor: this.availableColors[colorIndex],
    };
  }
}
