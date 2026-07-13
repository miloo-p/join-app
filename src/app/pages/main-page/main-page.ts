import { Component, inject } from '@angular/core';
import { Supabase } from '../../shared/services/supabase';
import { Contacts } from '../contacts/contacts';
import { Board } from '../board/board';

@Component({
  selector: 'app-main-page',
  imports: [Contacts, Board],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {
  dbService = inject(Supabase);

  ngOnInit() {
    this.dbService.getContacts();
    this.dbService.subscribeToContacts();
  }
}
