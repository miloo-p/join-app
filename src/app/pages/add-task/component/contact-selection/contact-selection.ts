import { Component, inject } from '@angular/core';
import { contactsService } from '../../../../shared/services/contacts-service';

@Component({
  selector: 'app-contact-selection',
  imports: [],
  templateUrl: './contact-selection.html',
  styleUrl: './contact-selection.scss',
})
export class ContactSelection {
  contactDatabase = inject(contactsService);

  async ngOnInit() {
    await this.contactDatabase.getContacts();
    await this.contactDatabase.subscribeToContacts();
  }

  selectedContactIds = new Set<number>();

  toggleContact(contactId: number): void {
    if (this.selectedContactIds.has(contactId)) {
      this.selectedContactIds.delete(contactId);
    } else {
      this.selectedContactIds.add(contactId);
    }
  }

  isSelected(contactId: number): boolean {
    return this.selectedContactIds.has(contactId);
  }
}
