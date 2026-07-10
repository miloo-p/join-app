import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-icon',
  standalone: true,
  templateUrl: './profile-icon.html',
  styleUrls: ['./profile-icon.scss']
})
export class ProfileIcon {

  @Input() initials = '';

  @Input() avatarColor = '';
}