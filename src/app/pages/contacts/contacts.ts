import { Component } from '@angular/core';
import { ContactDetail } from '../../sections/contacts-detail/contacts-detail';
import { ContactList } from '../../sections/contacts-list/contacts-list';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactList, ContactDetail],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.scss'],
})
export class Contacts {

}
