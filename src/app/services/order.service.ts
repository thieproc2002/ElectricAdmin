import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = "https://electricshopbe.onrender.com/api/orders";

  urlOrderDetail = "https://electricshopbe.onrender.com/api/orderDetail";

  constructor(private httpClient: HttpClient) { }

  get() {
    return this.httpClient.get(this.url+ '/nopage');
  }

  getByEmail(email:string) {
    return this.httpClient.get(this.url+'/user/'+email);
  }
  getById(id:number) {
    return this.httpClient.get(this.url+'/'+id);
  }

  getByOrder(id:number) {
    return this.httpClient.get(this.urlOrderDetail+'/order/'+id);
  }

  cancel(id: number) {
    return this.httpClient.get(this.url+'/cancel/'+id);
  }

  deliver(id: number) {
    return this.httpClient.get(this.url+'/deliver/'+id);
  }

  success(id: number) {
    return this.httpClient.get(this.url+'/success/'+id);
  }
}
