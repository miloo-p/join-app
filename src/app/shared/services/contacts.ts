import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { createClient } from '@supabase/supabase-js';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class Contacts {
  
  supabase = createClient(environment.apiUrl,environment.apiKey)

  productList: Contact[]= []

  productdetail = signal<Contact>(
    {
      "firstname": 'n/a',
      "lastname": 'n/a',
      "telephone": 'n/a',
      "email": 'n/a'
  }
  )
}
