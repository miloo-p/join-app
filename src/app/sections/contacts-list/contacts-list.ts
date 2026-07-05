import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button';
import { Supabase } from '../../shared/services/supabase';

/** Internal structure for alphabetically grouped contacts */
interface ContactGroup {
  letter: string;
  contacts: any[];
}

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './contacts-list.html',
  styleUrls: ['./contacts-list.scss'],
})
export class ContactList implements OnInit {
  public supabaseService = inject(Supabase);
  public selectedContact = signal<any | null>(null);

  public availableColors: string[] = [
    'var(--clr-user-tangerine)', 'var(--clr-user-flamingo)', 'var(--clr-user-iris)',
    'var(--clr-user-amethyst)', 'var(--clr-user-sky)', 'var(--clr-user-mint)',
    'var(--clr-user-salmon)', 'var(--clr-user-apricot)', 'var(--clr-user-fuchsia)',
    'var(--clr-user-sunflower)', 'var(--clr-user-cobalt)', 'var(--clr-user-lime)',
    'var(--clr-user-lemon)', 'var(--clr-user-cherry)', 'var(--clr-user-marigold)'
  ];

  public groupedContacts = computed<ContactGroup[]>(() => {
    const rawContacts = this.supabaseService.contacts();
    if (!rawContacts || rawContacts.length === 0) return [];
    
  
    const sorted = [...rawContacts].sort((a, b) => a.firstname.localeCompare(b.firstname));
    return this.buildAlphabeticalGroups(sorted);
  });

  ngOnInit(): void {
    this.supabaseService.getContacts();
    this.supabaseService.subscribeToContacts();
  }

  public selectContact(contact: any): void {
    this.selectedContact.set(contact);
  }

  private buildAlphabeticalGroups(sorted: any[]): ContactGroup[] {
    const groups: { [key: string]: any[] } = {};
    
    for (const contact of sorted) {
      const firstLetter = contact.firstname?.charAt(0).toUpperCase() || 'A';
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(this.transformContactData(contact));
    }
    
    return Object.keys(groups)
      .sort((a, b) => a.localeCompare(b))
      .map(letter => ({ letter, contacts: groups[letter] }));
  }

  private transformContactData(contact: any): any {
    const firstLetter = contact.firstname?.charAt(0).toUpperCase() || '';
    const lastLetter = contact.lastname?.charAt(0).toUpperCase() || '';
    const colorIndex = (contact.firstname.length + contact.lastname.length) % this.availableColors.length;
    return {
      ...contact,
      name: `${contact.firstname} ${contact.lastname}`,
      initials: `${firstLetter}${lastLetter}`,
      avatarColor: this.availableColors[colorIndex]
    };
  }
}