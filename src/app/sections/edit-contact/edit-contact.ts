import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UIContact } from '../../sections/contacts-list/contacts-list';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-contact.html',
  styleUrls: ['./edit-contact.scss'],
})
export class EditContactComponent {
  
  /**
   * Local copy of the contact being edited.
   * Keeps track of unsaved changes before saving.
   */
  public editingContact: UIContact | null = null;

  private _contact: UIContact | null = null;

  /**
   * The contact object currently selected for editing.
   * Fulfills User Story 4 (opens form with pre-filled data).
   * Uses setter to create a local copy when the input changes.
   */
  @Input()
  set contact(value: UIContact | null) {
    this._contact = value;
    // Create a copy to allow editing without affecting parent.
    // Note: Use structuredClone(value) if UIContact has nested objects!
    this.editingContact = value ? { ...value } : null;
  }

  get contact(): UIContact | null {
    return this._contact;
  }

  /** 
   * Emits an event to notify the parent component to close the edit overlay.
   */
  @Output() public closeOverlay = new EventEmitter<void>();

  /** 
   * Emits the updated contact object back to the parent component for saving.
   */
  @Output() public saveContact = new EventEmitter<UIContact>();

  /** 
   * Emits when the user requests to delete the current contact.
   */
  @Output() public deleteContact = new EventEmitter<UIContact>();

  /**
   * Triggers the event to close the edit contact overlay/view.
   */
  public onCloseOverlay(): void {
    this.closeOverlay.emit();
  }

  /**
   * Dispatches the updated contact data to the parent component to trigger the backend save.
   * Fulfills User Story 4 (submitting modified values).
   */
  public onSaveContact(): void {
    if (this.editingContact) {
      this.saveContact.emit(this.editingContact);
    }
  }

  /**
   * Triggers the delete event for the currently edited contact.
   * Fulfills User Story 4 (deleting option).
   */
  public onDeleteContact(): void {
    if (this.editingContact) {
      this.deleteContact.emit(this.editingContact);
    }
  }
}
