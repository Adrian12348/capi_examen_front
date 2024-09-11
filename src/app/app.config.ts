import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { provideRouter } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

export const routes: Routes = [
  { path: 'contacts', component: ContactListComponent },
  { path: 'contacts/:id', component: ContactDetailComponent },
  { path: 'add-contact', component: ContactAddComponent },
  { path: 'edit-contact/:id', component: ContactEditComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' }
];

export const appConfig = {
  providers: [
    provideRouter(routes),
    NgxDatatableModule
  ]
};
