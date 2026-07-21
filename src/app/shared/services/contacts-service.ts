import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root',
})
export class contactsService {
  supabase = createClient(environment.apiUrl, environment.apiKey)

  contacts = signal<Contact[]>([]);

  channels: RealtimeChannel | undefined;

  // Create
  async setContact(contacts: Contact[]) {
    const { data, error } = await this.supabase
      .from('contacts')
      .insert(contacts)
      .select();

    if (error) {
      console.error('Contacts insert error', error);
      return;
    }
    return data;
  }

  //Read
  async getContacts() {
    const { data: contacts, error } = await this.supabase
    .from('contacts')
    .select('*')
    if(!contacts) return
    this.contacts.set(contacts)
  }

  async getSingleContact(id: number) {
    const { data: contact, error } = await this.supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error('Contacts get single contact error', error);
      return;
    }
    return contact;
  }

  //Update
  async updateContact(contact: Contact) {
    const { error } = await this.supabase
      .from('contacts')
      .update(contact)
      .eq('id', contact.id);
    if (error) {
      console.error('Contacts update contact error', error);
    }
  }

  //Delete
  async deleteContact(id:number){
    const response = await this.supabase
      .from('contacts')
      .delete()
      .eq('id', id)
  }

  //Subscribe
  async subscribeToContacts() {
  if(this.channels) {
    return;
  }
  this.channels = this.supabase
  .channel('contacts-channel')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, (payload) => {
    this.handlePayload(payload);
  })
  .subscribe();
  }

  handlePayload(payload: any) {
    if (payload.eventType === 'INSERT') {
      this.contacts.update((contacts) => [...contacts, payload.new]);
    }else if (payload.eventType === 'UPDATE') {
      this.contacts.update((contacts) =>
        contacts.map((contact) =>
          contact.id === payload.new.id ? payload.new : contact
        )
      );
    } else if (payload.eventType === 'DELETE') {
      this.contacts.update((contacts) =>
        contacts.filter((contact) => contact.id !== payload.old.id)
      );
    }
  }

  ngOnDestroy() {
    if (this.channels) {
      this.supabase.removeChannel(this.channels);
    }
  }
}