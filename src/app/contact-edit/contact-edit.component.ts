import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contactId!: number;
  contact: any = {
    phones: [{ phone: '' }],
    emails: [{ email: '' }],
    addresses: [{ address: '' }]
  };

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.getContact(this.contactId).subscribe(data => {
      this.contact = data;
    });
  }

  addPhone(): void {
    this.contact.phones.push({ phone: '' });
  }

  removePhone(index: number): void {
    this.contact.phones.splice(index, 1);
  }

  addEmail(): void {
    this.contact.emails.push({ email: '' });
  }

  removeEmail(index: number): void {
    this.contact.emails.splice(index, 1);
  }

  addAddress(): void {
    this.contact.addresses.push({ address: '' });
  }

  removeAddress(index: number): void {
    this.contact.addresses.splice(index, 1);
  }

  trackByIndex(index: number): number {
    return index;
  }

  onSubmit(): void {
    if (this.contact.name) {
      // Convert objects to strings
      const updatedContact = {
        ...this.contact,
        phones: this.contact.phones.map((phoneObj: any) => phoneObj.phone),
        emails: this.contact.emails.map((emailObj: any) => emailObj.email),
        addresses: this.contact.addresses.map((addressObj: any) => addressObj.address),
      };

      this.contactService.updateContact(this.contactId, updatedContact).subscribe(
        (response) => {
          console.log('Contact updated successfully:', response);
          // this.router.navigate(['/contacts']);
        },
        (error) => {
          console.error('Error updating contact:', error);
        }
      );
    }
  }
}
