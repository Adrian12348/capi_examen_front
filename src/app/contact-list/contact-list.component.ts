import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ContactService } from '../contact.service';
import { RouterLink } from '@angular/router'; 
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf, RouterLink, NgxDatatableModule], 
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];
  columns = [
    { name: 'Name', prop: 'name' },
    { name: 'Phone', prop: 'phones' },
    { name: 'Email', prop: 'emails' },
    { name: 'Address', prop: 'addresses' }
  ];
  filterText: string = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }

  get filteredContacts() {
    return this.contacts.filter(contact => 
      contact.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
      this.extractValues(contact.phones).some(phone => phone.toLowerCase().includes(this.filterText.toLowerCase())) ||
      this.extractValues(contact.emails).some(email => email.toLowerCase().includes(this.filterText.toLowerCase())) ||
      this.extractValues(contact.addresses).some(address => address.toLowerCase().includes(this.filterText.toLowerCase()))
    );
  }

  private extractValues(arr: any[]): string[] {
    return arr.map(item => item.phone || item.email || item.address || '');
  }
}
