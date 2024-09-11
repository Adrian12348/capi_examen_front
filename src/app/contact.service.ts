import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Asegúrate de que esté disponible en toda la aplicación
})
export class ContactService {
  private apiUrl = 'http://localhost:8001/api/contacts'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {}

  getContact(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post(this.apiUrl, contact);
  }

  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
