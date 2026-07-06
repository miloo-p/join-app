import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  templateUrl: './edit-contact.html',
  styleUrls: ['./edit-contact.scss'],
})
export class EditContactComponent {
  @Input() public contact: any | null = null;
  @Output() public closeOverlay = new EventEmitter<void>();

  public onCloseOverlay(): void {
    this.closeOverlay.emit();
  }
}
