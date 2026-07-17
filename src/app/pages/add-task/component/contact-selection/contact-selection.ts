import { Component, inject, output, input } from '@angular/core';
import { contactsService } from '../../../../shared/services/contacts-service';

type AssignedCollaborator = {
  id: number;
  name: string;
};

type AssignedCollaboratorIcon = {
  id: number;
  firstname: string;
  lastname: string;
  name: string;
};


@Component({
  selector: 'app-contact-selection',
  standalone: true,
  imports: [],
  templateUrl: './contact-selection.html',
  styleUrl: './contact-selection.scss',
})
export class ContactSelection {
  contactDatabase = inject(contactsService);
  selectedContacts = input<AssignedCollaborator[]>([]);
  selectedContactsChange = output<AssignedCollaborator[]>();

  async ngOnInit() {
    await this.contactDatabase.getContacts();
    await this.contactDatabase.subscribeToContacts();
  }

  toggleContact(contactId: number): void {
    const selectedContactIds = new Set(
      this.selectedContacts().map(contact => contact.id)
    );

    if (selectedContactIds.has(contactId)) {
      selectedContactIds.delete(contactId);
    } else {
      selectedContactIds.add(contactId);
    }

    const selectedContacts = this.contactDatabase.contacts()
      .filter(contact => selectedContactIds.has(contact.id))
      .map(contact => ({
        id: contact.id,
        firstname: contact.firstname,
        lastname: contact.lastname,
        name: `${contact.firstname} ${contact.lastname}`,
      }));

    this.selectedContactsChange.emit(selectedContacts);
  }

  isSelected(contactId: number): boolean {
    return this.selectedContacts().some(contact => contact.id === contactId);
  }
}
