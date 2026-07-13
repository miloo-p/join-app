import { Component, inject } from '@angular/core';
import { contactsService } from '../../shared/services/contacts-service';
import { Contacts } from '../contacts/contacts';
import { Board } from '../board/board';

@Component({
  selector: 'app-main-page',
  imports: [Contacts, Board],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {
  dbContacts = inject(contactsService);

  ngOnInit() {
    this.dbContacts.getContacts();
    this.dbContacts.subscribeToContacts();
  }
}
