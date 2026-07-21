import { Component, Input, ViewChild, HostListener, ElementRef, inject } from '@angular/core';
import { ContactSelection } from '../contact-selection/contact-selection';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ProfileIcon } from '../../../../shared/components/profile-icon/profile-icon';
import { PrioSelection } from '../prio-selection/prio-selection';
import { AddTaskSubtasks } from '../add-task-subtasks/add-task-subtasks';

/** Contact data used to render selected collaborator profile icons. */
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
  @ViewChild('assignedDropdown') assignedDropdown!: ElementRef<HTMLElement>;
  @ViewChild('categoryDropdown') categoryDropdown!: ElementRef<HTMLElement>;

  private elementRef = inject(ElementRef);

  isContactDropdownOpen = false;
  isCategoryDropwDownOpen = false;

  /** Available avatar background colors for selected contact icons. */
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
    'var(--clr-feedback-disabled)',
  ];

  /** Stores the selected contacts in the task form. */
  setAssignedCollaborators(collaborators: { id: number; name: string }[]): void {
    this.form.patchValue({
      assignedTo: collaborators,
    });
  }

  /** Toggles the contact dropdown and closes the category dropdown. */
  toggleDropdown(): void {
    this.isContactDropdownOpen = !this.isContactDropdownOpen;
    if (this.isCategoryDropwDownOpen === true) {
      this.isCategoryDropwDownOpen = false;
    }
  }

  /** Toggles the category dropdown and closes the contact dropdown. */
  toggleDropdownCategory(): void {
    this.isCategoryDropwDownOpen = !this.isCategoryDropwDownOpen;

    if (!this.isCategoryDropwDownOpen) {
      this.form.get('category')?.markAsTouched();
    }
    if (this.isContactDropdownOpen === true) {
      this.isContactDropdownOpen = false;
    }
  }

  /** Stores the selected category in the task form. */
  getCategory(text: string): void {
    this.form.patchValue({ category: text });
    this.isCategoryDropwDownOpen = false;
  }

  /** Resets local dropdown and subtask state. */
  clearDetailInfo(): void {
    this.isContactDropdownOpen = false;
    this.isCategoryDropwDownOpen = false;
    this.subtaskInfo?.clearSubtasks();
  }

  /** Returns the currently selected contacts from the task form. */
  getSelectedContacts(): AssignedCollaboratorIcon[] {
    return this.form.get('assignedTo')?.value || [];
  }

  /** Builds initials and avatar color data for a selected contact. */
  getProfileData(contact: AssignedCollaboratorIcon) {
    const firstLetter = contact.firstname?.charAt(0).toUpperCase() || '';
    const lastLetter = contact.lastname?.charAt(0).toUpperCase() || '';
    const colorIndex =
      (contact.firstname.length + contact.lastname.length) % this.availableColors.length;

    return {
      initials: `${firstLetter}${lastLetter}`,
      avatarColor: this.availableColors[colorIndex],
    };
  }

  /** Returns the first three selected contacts for the visible avatar icons. */
  getVisibleContacts(): AssignedCollaboratorIcon[] {
    return this.getSelectedContacts().slice(0, 3);
  }

  /** Returns the number of selected contacts hidden behind the counter icon. */
  getHiddenContactsCount(): number {
    return Math.max(this.getSelectedContacts().length - 3, 0);
  }

  /** Closes open dropdowns when the user clicks outside this component. */
  @HostListener('document:click', ['$event'])
  closeDropdownsOnOutsideClick(event: MouseEvent): void {
    const target = event.target as Node;
    const clickedInsideAssigned = this.assignedDropdown?.nativeElement.contains(target);
    const clickedInsideCategory = this.categoryDropdown?.nativeElement.contains(target);

    if (!clickedInsideAssigned) {
      this.isContactDropdownOpen = false;
    }
    if (!clickedInsideCategory) {
      if (this.isCategoryDropwDownOpen) {
        this.form.get('category')?.markAsTouched();
      }
      this.isCategoryDropwDownOpen = false;
    }
  }
}
