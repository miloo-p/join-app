import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  
  supabase = createClient(environment.apiUrl, environment.apiKey)

  contacts = signal <{id:number,created_at: string, firstname:string, lastname:string, telephone:string, email:string}[]>([])

  channels: RealtimeChannel | undefined;

  //Read

  async getContacts() {
    const { data: contacts, error } = await this.supabase
    .from('contacts')
    .select('*')
    if(!contacts) return
    this.contacts.set(contacts)
  }


  // Create

  async setContact(contacts: Contact[]) {
    const { data, error } = await this.supabase
      .from('contacts')
      .insert(contacts)
      .select();

    if (error) {
      console.error('Supabase insert error', error);
      return;
    }

    return data;
  }

  //Subscribe
  async subscribeToContacts() {
  this.channels = this.supabase
  .channel('contacts-channel')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, (payload) => {
    this.getContacts();
  })
  .subscribe();
  }

  ngOnDestroy() {
    if (this.channels) {
      this.supabase.removeChannel(this.channels);
    }
  }
}