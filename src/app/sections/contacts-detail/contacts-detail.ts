import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-contacts-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts-detail.html',
  styleUrls: ['./contacts-detail.scss']
})
export class ContactsDetailComponent {
  @Input() public contact: any | null = null;

  @Output() public edit = new EventEmitter<any>();
  @Output() public delete = new EventEmitter<any>();

  public onEditContact(): void {
    if (this.contact) 
      this.edit.emit(this.contact);
  }

  public onDeleteContact(): void {
    if (this.contact) 
      this.delete.emit(this.contact);
  }
}
