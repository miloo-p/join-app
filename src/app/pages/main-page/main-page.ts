import { Component, inject} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ContactList } from "../../sections/contacts-list/contacts-list";
import { Supabase } from '../../shared/services/supabase';

@Component({
  selector: 'app-main-page',
  imports: [ContactList, JsonPipe],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {

  dbService = inject(Supabase)

  ngOnInit() {
    this.dbService.getContacts();
    this.dbService.subscribeToContacts();
  }
}
