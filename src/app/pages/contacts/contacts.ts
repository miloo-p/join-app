import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ContactsDetailComponent } from '../../sections/contacts-detail/contacts-detail';
import { ContactList } from '../../sections/contacts-list/contacts-list';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactList, ContactsDetailComponent],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.scss'],
})
export class Contacts {
  /** Central signal holding the currently active contact for the whole page */
  public activeContact = signal<any | null>(null);

  /**
   * Updates the central active contact when a selection event occurs.
   * @param {any} contact - The transformed contact object.
   */
  public handleContactSelection(contact: any): void {
    this.activeContact.set(contact);
  }
}
