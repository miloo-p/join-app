
/*Import kommt von der contacts-list ts, dann standalone: 
Input von intials und der color, unten auch ein Array mit den Farben

überall Concact ersetzen durch User: wir wollen mit den Initialen des eingeloggten Users Arbeiten!
User noch holen und Dateipfad richtig setzen!*/
import { Component, Input } from '@angular/core';


/*nur für Test User und UI User anlegen!!nachher über Datenbank holen*/
interface User {
  id: number;
  firstname: string;
  lastname: string;
}

interface UIUser extends User {
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

/*Import initials, avatar color, & user! and avaible colors */
export class ProfileIcon {

  @Input() initials = '';

  @Input() avatarColor = '';

  @Input() user!: User;

/*testing user*/
    public testUser: User = {
    id: 1,
    firstname: 'Magdalena',
    lastname: 'Laurisch'
  };


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
     * @param {User} user - The raw database user object.
     * @returns {UIUser} The enriched user object including UI properties.
     */
    private transformUserData(user: User): UIUser {
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


    /*only for testing in console!!!!*/

constructor() {
  console.log(this.transformUserData(this.testUser));
}
  }
  
