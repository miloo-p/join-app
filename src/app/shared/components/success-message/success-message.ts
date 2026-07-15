/* input holen von unten von contact-add-new-contact-dialog-html , sonst kann man den Test nicht lesen!Verküpfung*/


import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-message',
  imports: [],
  templateUrl: './success-message.html',
  styleUrl: './success-message.scss',
})
export class SuccessMessage {

  @Input() message = '';

}