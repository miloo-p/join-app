import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ContactsDetailComponent } from '../../sections/contacts-detail/contacts-detail';
import { ContactList, UIContact } from '../../sections/contacts-list/contacts-list';
import { EditContactComponent } from '../../sections/edit-contact/edit-contact';
import { Supabase } from '../../shared/services/supabase';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactList, ContactsDetailComponent, EditContactComponent],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.scss'],
})
export class Contacts {
  private supabaseService = inject(Supabase);

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
   * Deletes a contact from the database using the Supabase service and clears the active selection.
   * Fulfills User Story 4 (The option 'Delete' removes the contact permanently).
   * @param {UIContact} contact - The contact object requested for deletion.
   * @returns {Promise<void>}
   */
  public async handleDeleteContact(contact: UIContact): Promise<void> {
    if (!contact || !contact.id) {
      return;
    }

    await this.supabaseService.deleteContact(contact.id);

    this.activeContact.set(null);
    this.isEditContactOpen.set(false);
  }

  /**
   * Updates an edited contact in the database and refreshes the current active view.
   * Fulfills User Story 4 (Saving the adapted contact data).
   * @param {UIContact} updatedContact - The contact object with modified values.
   * @returns {Promise<void>}
   */
  public async handleContactUpdate(updatedContact: UIContact): Promise<void> {
    if (!updatedContact || !updatedContact.id) {
      return;
    }

    await this.supabaseService.updateContact(updatedContact);

    this.activeContact.set(updatedContact);
    this.closeEditContact();
  }
}