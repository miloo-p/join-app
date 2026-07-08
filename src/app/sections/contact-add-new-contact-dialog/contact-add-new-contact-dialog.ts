import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { Supabase } from '../../shared/services/supabase';
import { LogoWhite } from '../../shared/components/logo-white/logo-white';
import { ButtonComponent } from '../../shared/components/button/button.component';


@Component({
  selector: 'app-contact-add-new-contact-dialog',
  imports: [LogoWhite, ButtonComponent],
  templateUrl: './contact-add-new-contact-dialog.html',
  styleUrl: './contact-add-new-contact-dialog.scss',
})
export class ContactAddNewContactDialog {
  private supabaseService = inject(Supabase);

  @ViewChild('dialog_add_contact') dialog!: ElementRef<HTMLDialogElement>;

  openDialog() {
    this.dialog.nativeElement.showModal();
  }

  closeDialog() {
    this.dialog.nativeElement.close()
  }
}
