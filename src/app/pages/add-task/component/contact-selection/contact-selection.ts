import { Component, inject } from '@angular/core';
import { Supabase } from '../../../../shared/services/supabase';

@Component({
  selector: 'app-contact-selection',
  imports: [],
  templateUrl: './contact-selection.html',
  styleUrl: './contact-selection.scss',
})
export class ContactSelection {
  contactDatabase = inject(Supabase);

  async ngOnInit() {
    await this.contactDatabase.getContacts();
    await this.contactDatabase.subscribeToContacts();
  }
}
