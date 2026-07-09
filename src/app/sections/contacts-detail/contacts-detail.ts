import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UIContact } from '../contacts-list/contacts-list';

@Component({
  selector: 'app-contacts-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts-detail.html',
  styleUrls: ['./contacts-detail.scss']
})
export class ContactsDetailComponent {
  
  /**
   * The currently active contact to display in detail view.
   * Fulfills User Story 2 (viewing details).
   */
  @Input() public contact: UIContact | null = null;

  /** 
   * Emits when the user requests to edit the current contact.
   * @type {EventEmitter<UIContact>} 
   */
  @Output() public edit = new EventEmitter<UIContact>();

  /** 
   * Emits when the user requests to delete the current contact.
   * @type {EventEmitter<UIContact>} 
   */
  @Output() public delete = new EventEmitter<UIContact>();

  /** 
   * Emits when the mobile back button is pressed to close the details.
   * @type {EventEmitter<void>} 
   */
  @Output() public close = new EventEmitter<void>();

  /**
   * Triggers the edit event for the currently viewed contact.
   * Fulfills User Story 4 (editing option).
   * @returns {void}
   */
  public onEditContact(): void {
    if (this.contact) {
      this.edit.emit(this.contact);
    }
  }

  /**
   * Triggers the delete event for the currently viewed contact.
   * Fulfills User Story 4 (deleting option).
   * @returns {void}
   */
  public onDeleteContact(): void {
    if (this.contact) {
      this.delete.emit(this.contact);
    }
  }
  public onCloseDetail(): void {
    this.close.emit();
  }
}
