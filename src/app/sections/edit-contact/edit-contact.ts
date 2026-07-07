import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UIContact } from '../../sections/contacts-list/contacts-list';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  templateUrl: './edit-contact.html',
  styleUrls: ['./edit-contact.scss'],
})
export class EditContactComponent {
  
  /**
   * The contact object currently selected for editing.
   * Fulfills User Story 4 (opens form with pre-filled data).
   */
  @Input() public contact: UIContact | null = null;

  /** 
   * Emits an event to notify the parent component to close the edit overlay.
   * @type {EventEmitter<void>} 
   */
  @Output() public closeOverlay = new EventEmitter<void>();

  /** 
   * Emits the updated contact object back to the parent component for saving.
   * @type {EventEmitter<UIContact>} 
   */
  @Output() public saveContact = new EventEmitter<UIContact>();

  /** 
   * Emits when the user requests to delete the current contact.
   * @type {EventEmitter<UIContact>} 
   */
  @Output() public deleteContact = new EventEmitter<UIContact>();

  /**
   * Triggers the event to close the edit contact overlay/view.
   * @returns {void}
   */
  public onCloseOverlay(): void {
    this.closeOverlay.emit();
  }

  /**
   * Dispatches the updated contact data to the parent component to trigger the backend save.
   * Fulfills User Story 4 (submitting modified values).
   * @returns {void}
   */
  public onSaveContact(): void {
    if (this.contact) {
      this.saveContact.emit(this.contact);
    }
  }

  /**
   * Triggers the delete event for the currently edited contact.
   * Fulfills User Story 4 (deleting option).
   * @returns {void}
   */
  public onDeleteContact(): void {
    if (this.contact) {
      this.deleteContact.emit(this.contact);
    }
  }
}
