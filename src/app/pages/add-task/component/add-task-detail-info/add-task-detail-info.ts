import { Component, inject, OnInit, Input } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

import { ContactSelection } from '../contact-selection/contact-selection';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ProfileIcon } from '../../../../shared/components/profile-icon/profile-icon';

type AssignedCollaboratorIcon = {
  id: number;
  firstname: string;
  lastname: string;
  name: string;
};

@Component({
  selector: 'app-add-task-detail-info',
  standalone: true,
  imports: [ButtonComponent, ContactSelection, ReactiveFormsModule, ProfileIcon],
  templateUrl: './add-task-detail-info.html',
  styleUrl: './add-task-detail-info.scss',
})
export class AddTaskDetailInfo {
  @Input({ required: true }) form!: FormGroup;

  isContactDropdownOpen = false;
  isCategoryDropwDownOpen = false;
  currentSubtaskId: number = 1; //reseten nach create Task
  currentSubtastks: any[] = [];
  editingSubtaskId: number | null = null;
  isTextInSubtaskInput = false;

  setAssignedCollaborators(collaborators: { id: number; name: string }[]): void {
    this.form.patchValue({
      assignedTo: collaborators,
    });
  }

  checkTextInSubtaskInput(inputElement: HTMLInputElement): void {
    const subtaskInputValue = inputElement.value;
    if (subtaskInputValue === '') {
      this.isTextInSubtaskInput = false;
    } else {
      this.isTextInSubtaskInput = true;
    }
  };

  toggleDropdown(): void {
    this.isContactDropdownOpen = !this.isContactDropdownOpen;
    if (this.isCategoryDropwDownOpen === true) {
      this.isCategoryDropwDownOpen = false;
    } else {
      return
    }
  }

  toggleDropdownCategory(): void {
    this.isCategoryDropwDownOpen = !this.isCategoryDropwDownOpen;
    if (this.isContactDropdownOpen === true) {
      this.isContactDropdownOpen = false;
    } else {
      return
    }
  }

  getCategory(text: string): void {
    this.form.patchValue({ category: text });
    this.isCategoryDropwDownOpen = false;
  }

  selectPriority(priority: 'urgent' | 'medium' | 'low'): void {
    this.form.patchValue({ priority });
  }

  isPrioritySelected(priority: 'urgent' | 'medium' | 'low'): boolean {
    return this.form.get('priority')?.value === priority;
  }

  addSubtask(inputElement: HTMLInputElement): void {
    const value = inputElement.value.trim();

    if (!value) {
      return;
    }

    const subtask = {
      id: this.currentSubtaskId,
      name: value,
    };

    this.currentSubtastks.push(subtask);
    this.currentSubtaskId++;
    inputElement.value = '';
    this.isTextInSubtaskInput = false;
    this.updateSubtasksForm();
  }

  deleteSelectedSubtask(id: number) {
    const subtaskIndex = this.currentSubtastks.findIndex(subtask => subtask.id === id);

    if (subtaskIndex !== -1) {
      this.currentSubtastks.splice(subtaskIndex, 1)
    };

    this.updateSubtasksForm();
  }

  editSelectedSubtask(id: number): void {
    this.editingSubtaskId = id;
  }

  isEditingSubtask(id: number): boolean {
    return this.editingSubtaskId === id;
  }

  saveSelectedSubtask(id: number, newValue: string): void {
    const trimmedName = newValue.trim();
    if (!trimmedName) {
      return;
    }
    const subtask = this.currentSubtastks.find(subtask => subtask.id === id);
    if (!subtask) {
      return;
    }
    subtask.name = trimmedName;
    this.editingSubtaskId = null;
    this.updateSubtasksForm();
  }

  private updateSubtasksForm(): void {
    this.form.patchValue({
      subtasks: this.currentSubtastks,
    });
  }

  clearDetailInfo(): void {
    this.isContactDropdownOpen = false;
    this.isCategoryDropwDownOpen = false;
    this.currentSubtaskId = 1;
    this.currentSubtastks = [];
    this.editingSubtaskId = null;
    this.isTextInSubtaskInput = false;
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
