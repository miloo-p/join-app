import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

type Subtask = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-add-task-subtasks',
  standalone: true,
  imports: [],
  templateUrl: './add-task-subtasks.html',
  styleUrl: './add-task-subtasks.scss',
})
export class AddTaskSubtasks {
  @Input({ required: true }) form!: FormGroup;

  currentSubtaskId = 1;
  currentSubtasks: Subtask[] = [];
  editingSubtaskId: number | null = null;
  isTextInSubtaskInput = false;

  checkTextInSubtaskInput(inputElement: HTMLInputElement): void {
    this.isTextInSubtaskInput = inputElement.value.trim() !== '';
  }

  clearSubtaskInput(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    this.isTextInSubtaskInput = false;
  }

  addSubtask(inputElement: HTMLInputElement): void {
    const value = inputElement.value.trim();

    if (!value) {
      return;
    }

    this.currentSubtasks.push({
      id: this.currentSubtaskId,
      name: value,
    });

    this.currentSubtaskId++;
    inputElement.value = '';
    this.isTextInSubtaskInput = false;
    this.updateSubtasksForm();
  }

  deleteSelectedSubtask(id: number): void {
    this.currentSubtasks = this.currentSubtasks.filter(subtask => subtask.id !== id);
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

    const subtask = this.currentSubtasks.find(subtask => subtask.id === id);

    if (!subtask) {
      return;
    }

    subtask.name = trimmedName;
    this.editingSubtaskId = null;
    this.updateSubtasksForm();
  }

  clearSubtasks(): void {
    this.currentSubtaskId = 1;
    this.currentSubtasks = [];
    this.editingSubtaskId = null;
    this.isTextInSubtaskInput = false;
    this.updateSubtasksForm();
  }

  private updateSubtasksForm(): void {
    this.form.patchValue({
      subtasks: this.currentSubtasks,
    });
  }

  cancelEditSubtask(): void {
    this.editingSubtaskId = null;
  }
}