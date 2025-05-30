import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "https://electricshopbe.onrender.com/api/products";

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.url + '/nopage');
  }

  getOne(id: number) {
    return this.httpClient.get(this.url + '/' + id);
  }

  getBestSeller() {
    return this.httpClient.get(this.url + '/bestseller-admin');
  }

  save(product: Product) {
    return this.httpClient.post(this.url, product);
  }

  update(product: Product, id: number) {
    return this.httpClient.put(this.url + '/' + id, product);
  }

  delete(id: number) {
    return this.httpClient.delete(this.url + '/' + id);
  }
}
