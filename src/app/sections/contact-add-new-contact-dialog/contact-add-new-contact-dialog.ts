import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { Supabase } from '../../shared/services/supabase';
import { LogoWhite } from '../../shared/components/logo-white/logo-white';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-contact-add-new-contact-dialog',
  standalone: true,
  imports: [LogoWhite, ButtonComponent, FormsModule],
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

  contactForm = {
    name: '',
    email: '',
    telephone: '',
  };

  nameError = '';

  private isValidName(name: string): boolean {
    const parts = name.trim().split(/\s+/);

    return parts.length >= 2 && parts.every(part => part.length >= 2);
  }

  async createContact() {
    this.nameError = '';

    if (!this.isValidName(this.contactForm.name)) {
      this.nameError = 'Bitte gib mindestens Vor- und Nachnamen mit jeweils 2 Zeichen ein.';
      return;
    }

    const trimmedName = this.contactForm.name.trim();
    const [firstname, ...lastnameParts] = trimmedName.split(' ');

    const newContact = {
      firstname: firstname,
      lastname: lastnameParts.join(' '),
      email: this.contactForm.email,
      telephone: this.contactForm.telephone,
    };

    await this.supabaseService.setContact([newContact]);

    this.contactForm = {
      name: '',
      email: '',
      telephone: '',
    };

    this.closeDialog();
  }
}
