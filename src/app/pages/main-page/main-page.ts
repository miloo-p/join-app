import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Supabase } from '../../shared/services/supabase';
import { Contacts } from '../contacts/contacts';

@Component({
  selector: 'app-main-page',
  imports: [JsonPipe, Contacts],
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
