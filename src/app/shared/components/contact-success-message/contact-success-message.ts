/* input holen von unten von contact-add-new-contact-dialog-html , sonst kann man den Test nicht lesen!Verküpfung*/


import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-success-message',
  imports: [],
  templateUrl: './contact-success-message.html',
  styleUrl: './contact-success-message.scss',
})
export class ContactSuccessMessage {

  @Input() message = '';

}