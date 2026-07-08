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
  contactForm = {
    name: '',
    email: '',
    telephone: '',
  };
  nameError = '';
  emailError = '';
  telephoneError = '';

  private supabaseService = inject(Supabase);

  @ViewChild('dialog_add_contact') dialog!: ElementRef<HTMLDialogElement>;

  openDialog() {
    this.dialog.nativeElement.showModal();
    this.resetForm();
    this.resetErrorMsg();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
    this.resetForm();
    this.resetErrorMsg();
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      telephone: '',
    };
  }

  resetErrorMsg() {
    this.nameError = '';
    this.emailError = '';
    this.telephoneError = '';
  }

  private isValidName(name: string): boolean {
    const parts = name.trim().split(/\s+/);

    return parts.length >= 2 && parts.every(part => part.length >= 2);
  }

  private isValidEmail(email: string): boolean {
    const trimmedEmail = email.trim().toLowerCase();

    return trimmedEmail.includes('@') &&
      (trimmedEmail.endsWith('.com') || trimmedEmail.endsWith('.de'));
  }

  private isValidTelephone(telephone: string): boolean {
    return telephone.trim().startsWith('+49');
  }

  private isFormValid(): boolean {
    this.resetErrorMsg();
    if (!this.isValidName(this.contactForm.name)) {
      this.nameError = 'Bitte gib mindestens Vor- und Nachnamen mit jeweils 2 Zeichen ein.';
      return false;
    }
    if (!this.isValidEmail(this.contactForm.email)) {
      this.emailError = 'Bitte gib eine E-Mail mit @ und der Endung .com oder .de ein.';
      return false;
    }
    if (!this.isValidTelephone(this.contactForm.telephone)) {
      this.telephoneError = 'Bitte gib eine Telefonnummer ein, die mit +49 beginnt.';
      return false;
    }
    return true;
  }

  async createContact() {
    if (!this.isFormValid()) return;

    const trimmedName = this.contactForm.name.trim();
    const [firstname, ...lastnameParts] = trimmedName.split(' ');

    const newContact = {
      firstname: firstname,
      lastname: lastnameParts.join(' '),
      email: this.contactForm.email,
      telephone: this.contactForm.telephone,
    };

    await this.supabaseService.setContact([newContact]);

    this.resetForm();

    this.closeDialog();
  }
}
