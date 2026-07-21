import { Component, inject, output, input } from '@angular/core';
import { contactsService } from '../../../../shared/services/contacts-service';
import { ProfileIcon } from '../../../../shared/components/profile-icon/profile-icon';

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
  imports: [ProfileIcon],
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

  toggleContact(contactId: number | undefined): void {
    if (contactId === undefined) {
      return;
    }

    const selectedContactIds = new Set(this.selectedContacts().map((contact) => contact.id));

    if (selectedContactIds.has(contactId)) {
      selectedContactIds.delete(contactId);
    } else {
      selectedContactIds.add(contactId);
    }

    const selectedContacts = this.contactDatabase
      .contacts()
      .filter((contact) => contact.id !== undefined && selectedContactIds.has(contact.id))
      .map((contact) => ({
        id: contact.id as number,
        firstname: contact.firstname,
        lastname: contact.lastname,
        name: `${contact.firstname} ${contact.lastname}`,
      }));

    this.selectedContactsChange.emit(selectedContacts);
  }

  isSelected(contactId: number | undefined): boolean {
    if (contactId === undefined) {
      return false;
    }

    return this.selectedContacts().some((contact) => contact.id === contactId);
  }

  availableColors: string[] = [
    'var(--clr-user-tangerine)',
    'var(--clr-user-flamingo)',
    'var(--clr-user-iris)',
    'var(--clr-user-amethyst)',
    'var(--clr-user-sky)',
    'var(--clr-user-mint)',
    'var(--clr-user-salmon)',
    'var(--clr-user-apricot)',
    'var(--clr-user-fuchsia)',
    'var(--clr-user-sunflower)',
    'var(--clr-user-cobalt)',
    'var(--clr-user-lime)',
    'var(--clr-user-lemon)',
    'var(--clr-user-cherry)',
    'var(--clr-user-marigold)',
  ];

  getProfileData(contact: { firstname: string; lastname: string }) {
    const firstLetter = contact.firstname?.charAt(0).toUpperCase() || '';
    const lastLetter = contact.lastname?.charAt(0).toUpperCase() || '';
    const colorIndex =
      (contact.firstname.length + contact.lastname.length) % this.availableColors.length;

    return {
      initials: `${firstLetter}${lastLetter}`,
      avatarColor: this.availableColors[colorIndex],
    };
  }
}
