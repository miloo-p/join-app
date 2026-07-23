/*
The imports come from contacts-list.ts.

Since this is a standalone component,
the required imports are added directly to the component.

The initials and the avatar color are passed via @Input().
There is also an array containing the available avatar colors.

Replace Contact with User everywhere,
because we want to work with the initials of the logged-in user.

Import the Contact model and set the correct file path.
*/

import { Component, Input } from '@angular/core';


/*only fpr testing Contact Contact ID*/
interface Contact {
  id: number;
  firstname: string;
  lastname: string;
}

interface UIContact extends Contact {
  name: string;
  initials: string;
  avatarColor: string;
}

@Component({
  selector: 'app-profile-icon',
  standalone: true,
  templateUrl: './profile-icon.html',
  styleUrls: ['./profile-icon.scss']
})

/*Import initials, avatar color, & Contact! and avaible colors */
export class ProfileIcon {

  @Input() initials = '';

  @Input() avatarColor = '';

  @Input() contact?: UIContact;

  @Input() size: 'normal' | 'small' | 'big' | 'eighty' | 'header' = 'normal';

/*testing user*/
public testContact!: UIContact;

constructor() {
  this.testContact = this.transformContactData({
    id: 1,
    firstname: 'Magdalena',
    lastname: 'Laurisch'
  });
}

    public availableColors: string[] = [
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

/*from Jérôme Data: contact-list: changing: contact to user! */
    /**
     * Transforms raw Supabase database fields into UI-ready fields like combined name, initials, and colors.
     * @param {Contact} contact - The raw database user object.
     * @returns {UIContact} The enriched user object including UI properties.
     */
private transformContactData(contact: Contact): UIContact {
    const firstLetter = contact.firstname?.charAt(0).toUpperCase() || '';
    const lastLetter = contact.lastname?.charAt(0).toUpperCase() || '';
    const contactId = typeof contact.id === 'number' ? contact.id : 0;
    const colorIndex = Math.abs(contactId) % this.availableColors.length;
    return {
      ...contact,
      name: `${contact.firstname} ${contact.lastname}`,
      initials: `${firstLetter}${lastLetter}`,
      avatarColor: this.availableColors[colorIndex],
    };
  }
}


  
