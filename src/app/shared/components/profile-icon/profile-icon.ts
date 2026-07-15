
/*Import kommt von der contacts-list ts, dann standalone: 
Input von intials und der color, unten auch ein Array mit den Farben

überall Concact ersetzen durch User: wir wollen mit den Initialen des eingeloggten Users Arbeiten!*/
import { Component, Input } from '@angular/core';
import { Contact } from '../../interfaces/contact';

@Component({
  selector: 'app-profile-icon',
  standalone: true,
  templateUrl: './profile-icon.html',
  styleUrls: ['./profile-icon.scss']
})


export class ProfileIcon {

  @Input() initials = '';

  @Input() avatarColor = '';

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


    /**
     * Transforms raw Supabase database fields into UI-ready fields like combined name, initials, and colors.
     * @param {User} contact - The raw database contact object.
     * @returns {UIUser} The enriched contact object including UI properties.
     */
    private transformContactData(user: User): UIUser {
      const firstLetter = user.firstname?.charAt(0).toUpperCase() || '';
      const lastLetter = user.lastname?.charAt(0).toUpperCase() || '';
      const colorIndex = (user.firstname.length + user.lastname.length) % this.availableColors.length;
      return {
        ...user,
        name: `${user.firstname} ${user.lastname}`,
        initials: `${firstLetter}${lastLetter}`,
        avatarColor: this.availableColors[colorIndex]
      };
    }
  }
  
