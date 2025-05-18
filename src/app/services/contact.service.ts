import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { contact } from '../common/contact';

@Injectable({
    providedIn: 'root'
  })
  export class ContactService {
    private apiUrl = 'https://electricshopbe.onrender.com/api/contacts'; // URL của API
  
    constructor(private http: HttpClient) { }
  
    getData(): Observable<any> {
      return this.http.get<any>(this.apiUrl);
    }
    getContactById(contactID: number) {
        return this.http.get<contact>(`${this.apiUrl}/${contactID}`);
    }
    sendEmailAndUpdateStatus(contact: contact, replyMessage: string): Observable<any> {
      const url = `${this.apiUrl}/send-email?replyMessage=${encodeURIComponent(replyMessage)}`;
      return this.http.post(url, contact);
    }
  
   
      
  }