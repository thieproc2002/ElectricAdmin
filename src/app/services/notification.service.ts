import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url = 'https://electricshopbe.onrender.com/api/notification';

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(this.url);
  }

  readed(id: number) {
    return this.http.get(this.url+'/readed/'+id);
  }
}
