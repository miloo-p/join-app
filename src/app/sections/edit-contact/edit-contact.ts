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
   * Triggers the event to close the edit contact overlay/view.
   * @returns {void}
   */
  public onCloseOverlay(): void {
    this.closeOverlay.emit();
  }
}
