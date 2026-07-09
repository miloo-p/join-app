import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, computed, inject, signal, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Contact } from '../../shared/interfaces/contact';
import { Supabase } from '../../shared/services/supabase';
import { ContactAddNewContactDialog } from '../contact-add-new-contact-dialog/contact-add-new-contact-dialog';

export interface UIContact extends Contact {
  name: string;
  initials: string;
  avatarColor: string;
}

interface ContactGroup {
  letter: string;
  contacts: UIContact[];
}

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ContactAddNewContactDialog],
  templateUrl: './contacts-list.html',
  styleUrls: ['./contacts-list.scss'],
})
export class ContactList implements OnInit {
  public supabaseService = inject(Supabase);
  public selectedContact = signal<UIContact | null>(null);

  @ViewChild(ContactAddNewContactDialog)
  public addContactDialog!: ContactAddNewContactDialog;

  public openAddContactDialog(): void {
    this.addContactDialog.openDialog();
  }

  @Output() public contactSelected = new EventEmitter<UIContact>();

  public availableColors: string[] = [
    'var(--clr-user-tangerine)', 'var(--clr-user-flamingo)', 'var(--clr-user-iris)',
    'var(--clr-user-amethyst)', 'var(--clr-user-sky)', 'var(--clr-user-mint)',
    'var(--clr-user-salmon)', 'var(--clr-user-apricot)', 'var(--clr-user-fuchsia)',
    'var(--clr-user-sunflower)', 'var(--clr-user-cobalt)', 'var(--clr-user-lime)',
    'var(--clr-user-lemon)', 'var(--clr-user-cherry)', 'var(--clr-user-marigold)'
  ];

  /**
   * Computed signal that automatically groups and sorts contacts alphabetically.
   * Fulfills User Story 1 (alphabetical sorting and section splitting).
   */
  public groupedContacts = computed<ContactGroup[]>(() => {
    const rawContacts = this.supabaseService.contacts();
    if (!rawContacts || rawContacts.length === 0) return [];

    const sorted = [...rawContacts].sort((a, b) => a.firstname.localeCompare(b.firstname));
    return this.buildAlphabeticalGroups(sorted);
  });

  /**
   * Angular lifecycle hook. Initializes contact data and sets up realtime subscription.
   * @returns {void}
   */
  ngOnInit(): void {
    this.supabaseService.getContacts();
    this.supabaseService.subscribeToContacts();
  }

  /**
   * Selects a contact, transforms its data for the UI, and emits the selection event.
   * Fulfills User Story 2 (viewing contact details).
   * @param {Contact} contact - The contact object received from Supabase.
   * @returns {void}
   */
  public selectContact(contact: Contact): void { 
    const isFirstTime = this.selectedContact() === null;
    const transformed = this.transformContactData(contact);
    (transformed as any).isFirstClick = isFirstTime;

    this.selectedContact.set(transformed);
    this.contactSelected.emit(transformed);

    if (isFirstTime) {
      setTimeout(() => {
        const current = this.selectedContact();
        if (current) {
          (current as any).isFirstClick = false;
          this.selectedContact.set({ ...current });
        }
      }, 100);
    }
  }

  /**
   * Groups a sorted list of contacts into alphabetical sections based on the first letter.
   * @param {Contact[]} sorted - Array of sorted raw contacts.
   * @returns {ContactGroup[]} Array of grouped contacts containing the letter and matching UI contacts.
   */
  private buildAlphabeticalGroups(sorted: Contact[]): ContactGroup[] { 
    const groups: { [key: string]: UIContact[] } = {};

    for (const contact of sorted) {
      const firstLetter = contact.firstname?.charAt(0).toUpperCase() || 'A';
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(this.transformContactData(contact));
    }

    return Object.keys(groups)
      .sort((a, b) => a.localeCompare(b))
      .map(letter => ({ letter, contacts: groups[letter] }));
  }

  /**
   * Transforms raw Supabase database fields into UI-ready fields like combined name, initials, and colors.
   * @param {Contact} contact - The raw database contact object.
   * @returns {UIContact} The enriched contact object including UI properties.
   */
  private transformContactData(contact: Contact): UIContact {
    const firstLetter = contact.firstname?.charAt(0).toUpperCase() || '';
    const lastLetter = contact.lastname?.charAt(0).toUpperCase() || '';
    const contactId = typeof contact.id === 'number' ? contact.id : 0;
    const colorIndex = Math.abs(contactId) % this.availableColors.length;
    return {
      ...contact,
      name: `${contact.firstname} ${contact.lastname}`,
      initials: `${firstLetter}${lastLetter}`,
      avatarColor: this.availableColors[colorIndex]
    };
  }
}
