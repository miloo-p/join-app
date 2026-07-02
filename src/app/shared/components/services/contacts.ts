import { Injectable,signal } from '@angular/core';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class Contacts {
  
    contactdetail = signal<Contact>(
    {
      "id": 0,
      "firstname": 'n/a',
      "lastname": 'n/a',
      "telephone": 'n/a',
      "email": 'n/a',
  })

}
