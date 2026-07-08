import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { Supabase } from '../../shared/services/supabase';
import { LogoWhite } from '../../shared/components/logo-white/logo-white';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact-add-new-contact-dialog',
  standalone: true,
  imports: [LogoWhite, ButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-add-new-contact-dialog.html',
  styleUrl: './contact-add-new-contact-dialog.scss',
})
export class ContactAddNewContactDialog {
  contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\S{2,}\s+\S{2,}.*$/),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.(com|de)$/i),
    ]),
    telephone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\s*\+49[\d\s]+$/),
    ]),
  });

  private supabaseService = inject(Supabase);

  @ViewChild('dialog_add_contact') dialog!: ElementRef<HTMLDialogElement>;

  openDialog() {
    this.dialog.nativeElement.showModal();
    this.resetForm();
  }

  closeDialog() {
    this.dialog.nativeElement.close();
    this.resetForm();
  }

  resetForm() {
    this.contactForm.reset({
      name: '',
      email: '',
      telephone: '',
    });
  }

  // private isValidName(name: string): boolean {
  //   const parts = name.trim().split(/\s+/);

  //   return parts.length >= 2 && parts.every(part => part.length >= 2);
  // }

  // private isValidEmail(email: string): boolean {
  //   const trimmedEmail = email.trim().toLowerCase();

  //   return trimmedEmail.includes('@') &&
  //     (trimmedEmail.endsWith('.com') || trimmedEmail.endsWith('.de'));
  // }

  // private isValidTelephone(telephone: string): boolean {
  //   const cleanedTelephone = telephone.replace(/\s/g, '');
  //   return cleanedTelephone.startsWith('+49');
  // }

  // private isFormValid(): boolean {
  //   this.resetErrorMsg();
  //   if (!this.isValidName(this.contactForm.name)) {
  //     this.nameError = 'Bitte gib mindestens Vor- und Nachnamen mit jeweils 2 Zeichen ein.';
  //     return false;
  //   }
  //   if (!this.isValidEmail(this.contactForm.email)) {
  //     this.emailError = 'Bitte gib eine E-Mail mit @ und der Endung .com oder .de ein.';
  //     return false;
  //   }
  //   if (!this.isValidTelephone(this.contactForm.telephone)) {
  //     this.telephoneError = 'Bitte gib eine Telefonnummer ein, die mit +49 beginnt.';
  //     return false;
  //   }
  //   return true;
  // }

  async createContact() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const name = this.contactForm.controls.name.value!.trim();
    const email = this.contactForm.controls.email.value!.trim();
    const telephone = this.contactForm.controls.telephone.value!.replace(/\s/g, '');

    const [firstname, ...lastnameParts] = name.split(/\s+/);

    const newContact = {
      firstname,
      lastname: lastnameParts.join(' '),
      email,
      telephone,
    };

    await this.supabaseService.setContact([newContact]);

    this.closeDialog();
  }
}
