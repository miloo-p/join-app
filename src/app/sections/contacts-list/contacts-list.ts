import { Component } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contacts',
  imports: [],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts {

  supabase = createClient(environment.apiUrl, environment.apiKey);

  fetchData(){

  }
}
