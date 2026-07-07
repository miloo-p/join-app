import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ContactsDetailComponent } from '../../sections/contacts-detail/contacts-detail';
import { ContactList, UIContact } from '../../sections/contacts-list/contacts-list';
import { EditContactComponent } from '../../sections/edit-contact/edit-contact';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactList, ContactsDetailComponent, EditContactComponent],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.scss'],
})
export class Contacts {
  /** 
   * Central signal holding the currently active contact for the whole page.
   * Strictly typed to UIContact to ensure data integrity between list and detail views.
   */
  public activeContact = signal<UIContact | null>(null);
  
  /** Signal controlling the visibility state of the edit contact component/overlay. */
  public isEditContactOpen = signal<boolean>(false);

  /**
   * Updates the central active contact when a selection event occurs.
   * Fulfills User Story 2 (handling contact selection).
   * @param {UIContact} contact - The transformed contact object from the list.
   * @returns {void}
   */
  public handleContactSelection(contact: UIContact): void {
    this.activeContact.set(contact);
  }

  /**
   * Sets the active contact and opens the edit contact view/overlay.
   * Fulfills User Story 4 (initiating contact editing).
   * @param {UIContact} contact - The contact object to be edited.
   * @returns {void}
   */
  public openEditContact(contact: UIContact): void {
    this.activeContact.set(contact);
    this.isEditContactOpen.set(true);
  }

  /**
   * Closes the edit contact view/overlay.
   * @returns {void}
   */
  public closeEditContact(): void {
    this.isEditContactOpen.set(false);
  }

  /**
   * Handles the UI-side removal of a contact by clearing the active selection and closing open views.
   * Fulfills User Story 4 (UI response to deletion).
   * @param {UIContact} contact - The contact object requested for deletion.
   * @returns {void}
   */
  public handleDeleteContactUi(contact: UIContact): void {
    if (!contact) {
      return;
    }

    // UI-only placeholder: backend deletion is handled in a separate task.
    this.activeContact.set(null);
    this.isEditContactOpen.set(false);
  }
}
