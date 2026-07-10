import { Component, inject } from '@angular/core';
import { contactsService } from '../../shared/services/contacts-service';
import { Contacts } from '../contacts/contacts';

@Component({
  selector: 'app-main-page',
  imports: [Contacts,],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {

  dbContacts = inject(contactsService)

  ngOnInit() {
    this.dbContacts.getContacts();
    this.dbContacts.subscribeToContacts();
  }
}
