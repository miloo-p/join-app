
/*
The imports come from contacts-list.ts.

Since this is a standalone component,
the required imports are added directly to the component.

The initials and the avatar color are passed via @Input().
There is also an array containing the available avatar colors.

Replace Contact with User everywhere,
because we want to work with the initials of the logged-in user.

Import the User model and set the correct file path.
*/

import { Component, Input } from '@angular/core';


/*only fpr testing User User ID*/
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

public get profileData(): UIUser {
  return this.transformUserData(this.testUser);
}
  }
  
