import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './contacts-list.html',
  styleUrls: ['./contacts-list.scss'],
})
export class ContactList implements OnInit {
  availableColors: string[] = [
    'var(--clr-user-tangerine)',
    'var(--clr-user-flamingo)',
    'var(--clr-user-iris)',
    'var(--clr-user-amethyst)',
    'var(--clr-user-sky)',
    'var(--clr-user-mint)',
    'var(--clr-user-salmon)',
    'var(--clr-user-apricot)',
    'var(--clr-user-fuchsia)',
    'var(--clr-user-sunflower)',
    'var(--clr-user-cobalt)',
    'var(--clr-user-lime)',
    'var(--clr-user-lemon)',
    'var(--clr-user-cherry)',
    'var(--clr-user-marigold)'
  ];

  contacts: any[] = [];

  ngOnInit(): void {
    this.loadAndColorContacts();
  }

  loadAndColorContacts(): void {
    const rawData = [
      { name: 'Anton Mayer', email: 'antonm@gmail.com' },
      { name: 'Benedikt Ziegler', email: 'benedikt@gmail.com' },
      { name: 'Christian Müller', email: 'christian.mueller@gmail.com' },
      { name: 'David Eisenberg', email: 'david.eisenberg@gmail.com' },
      { name: 'Eva Braun', email: 'eva.braun@gmail.com' },
      { name: 'Friedrich Schiller', email: 'friedrich.schiller@gmail.com' },
      { name: 'Gisela Schmidt', email: 'gisela.schmidt@gmail.com' },
      { name: 'Hans Zimmer', email: 'hans.zimmer@gmail.com' },
      { name: 'Ingrid Bergman', email: 'ingrid.bergman@gmail.com' },
      { name: 'Jürgen Klopp', email: 'juergen.klopp@gmail.com' },
    ];

  
    this.contacts = rawData.map(contact => {
      const randomIndex = Math.floor(Math.random() * this.availableColors.length);
      
      const initials = contact.name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase();

      return {
        ...contact,
        initials: initials,
        avatarColor: this.availableColors[randomIndex]
      };
    });
  }
}
