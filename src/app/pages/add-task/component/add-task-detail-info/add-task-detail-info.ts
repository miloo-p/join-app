import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

import { ContactSelection } from '../contact-selection/contact-selection';

@Component({
  selector: 'app-add-task-detail-info',
  standalone: true,
  imports: [ButtonComponent, ContactSelection],
  templateUrl: './add-task-detail-info.html',
  styleUrl: './add-task-detail-info.scss',
})
export class AddTaskDetailInfo {

  isContactDropdownOpen = false;
  isCategoryDropwDownOpen = false;
  isUrgentSelected = false;
  isMediumSelected = true;
  isLowSelected = false;
  categorySelected = '';
  currentSubtaskId: number = 1; //reseten nach create Task
  currentSubtastks: any[] = [];
  editingSubtaskId: number | null = null;
  isTextInSubtaskInput = false;

  checkTextInSubtaskInput(inputElement: HTMLInputElement):void {
    const subtaskInputValue = inputElement.value;
    if(subtaskInputValue === '') {
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
    this.categorySelected = text;
    this.isCategoryDropwDownOpen = false;
  }

  toggleUrgentBtn(): void {
    this.isUrgentSelected = !this.isUrgentSelected;
    if (this.isUrgentSelected === true) {
      this.isMediumSelected = false;
      this.isLowSelected = false;
    };
    this.mediumBtnStandard();
  };

  toggleMediumBtn(): void {
    this.isMediumSelected = !this.isMediumSelected;
    if (this.isMediumSelected === true) {
      this.isUrgentSelected = false;
      this.isLowSelected = false;
    };
    this.mediumBtnStandard();
  };

  toggleLowBtn(): void {
    this.isLowSelected = !this.isLowSelected;
    if (this.isLowSelected === true) {
      this.isUrgentSelected = false;
      this.isMediumSelected = false;
    };
    this.mediumBtnStandard();
  };

  mediumBtnStandard(): void {
    if (this.isUrgentSelected === false && this.isMediumSelected === false && this.isLowSelected === false) {
      this.isMediumSelected = true;
    }
  }

  addSubtask(inputElement: HTMLInputElement) {
    const value = inputElement.value;
    const subtask = {
      id: this.currentSubtaskId,
      name: value
    };
    this.currentSubtastks.push(subtask);
    this.currentSubtaskId++;
    inputElement.value = '';
    this.isTextInSubtaskInput = false
  }

  deleteSelectedSubtask(id: number) {
    const subtaskIndex = this.currentSubtastks.findIndex(subtask => subtask.id === id);

    if (subtaskIndex !== -1) {
      this.currentSubtastks.splice(subtaskIndex, 1)
    }
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
  }

  createTask() {
    // currentSubtaskId resetten
  }
}
