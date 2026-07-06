import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ContactsDetailComponent } from '../../sections/contacts-detail/contacts-detail';
import { ContactList } from '../../sections/contacts-list/contacts-list';
import { EditContactComponent } from '../../sections/edit-contact/edit-contact';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactList, ContactsDetailComponent, EditContactComponent],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.scss'],
})
export class Contacts {
  /** Central signal holding the currently active contact for the whole page */
  public activeContact = signal<any | null>(null);
  public isEditContactOpen = signal<boolean>(false);

  /**
   * Updates the central active contact when a selection event occurs.
   * @param {any} contact - The transformed contact object.
   */
  public handleContactSelection(contact: any): void {
    this.activeContact.set(contact);
  }

  public openEditContact(contact: any): void {
    this.activeContact.set(contact);
    this.isEditContactOpen.set(true);
  }

  public closeEditContact(): void {
    this.isEditContactOpen.set(false);
  }
}
