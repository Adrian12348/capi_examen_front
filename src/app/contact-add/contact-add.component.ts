// src/app/contact-add/contact-add.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent {
  contact: any = {
    phones: [''],
    emails: [''],
    addresses: ['']
  };

  constructor(private contactService: ContactService, private router: Router) {}

  addPhone(): void {
    this.contact.phones.push('');
  }

  removePhone(index: number): void {
    this.contact.phones.splice(index, 1);
  }

  addEmail(): void {
    this.contact.emails.push('');
  }

  removeEmail(index: number): void {
    this.contact.emails.splice(index, 1);
  }

  addAddress(): void {
    this.contact.addresses.push('');
  }

  removeAddress(index: number): void {
    this.contact.addresses.splice(index, 1);
  }

  trackByIndex(index: number): number {
    return index;
  }

  onSubmit(): void {
    if (this.contact.name) {
      this.contactService.addContact(this.contact).subscribe(
        (response) => {
          console.log('Contact added successfully:', response);
          this.router.navigate(['/contacts']); // Redirect after successful addition
        },
        (error) => {
          console.error('Error adding contact:', error);
        }
      );
    }
  }
}
