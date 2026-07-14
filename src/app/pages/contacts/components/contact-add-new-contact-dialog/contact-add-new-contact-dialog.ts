import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { LogoWhite } from '../../../../shared/components/logo-white/logo-white';
import { contactsService } from '../../../../shared/services/contacts-service';

@Component({
  selector: 'app-contact-add-new-contact-dialog',
  standalone: true,
  imports: [LogoWhite, ButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-add-new-contact-dialog.html',
  styleUrl: './contact-add-new-contact-dialog.scss',
})
export class ContactAddNewContactDialog {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^\S{2,}\s+\S{2,}.*$/)]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.(com|de)$/i),
    ]),
    telephone: new FormControl('', [Validators.required, Validators.pattern(/^\s*\+49[\d\s]+$/)]),
  });

  private contactsService = inject(contactsService);

  @Output() contactCreated = new EventEmitter<any>();

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

    const savedData = await this.contactsService.setContact([newContact]);

    if (savedData && savedData.length > 0) {
      this.contactCreated.emit(savedData[0]);
    }
    this.closeDialog();
  }

  closeDialogBubbleProtection(event: Event) {
    event.stopPropagation();
  }

  onDialogClick(event: MouseEvent) {
    if (event.target === this.dialog.nativeElement) {
      this.closeDialog();
    }
  }
}
