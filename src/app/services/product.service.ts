import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  fetchProducts(){
    return this.httpClient.get('https://fakestoreapi.com/products');
  }
}
