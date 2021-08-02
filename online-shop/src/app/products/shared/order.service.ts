import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartItem } from './cart-item.model';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderUrl = 'http://localhost:3000/orders';

  constructor(private httpClient: HttpClient) { }

  placeOrder(products: CartItem[]) {
    let customer = "doej";
    return this.httpClient.post(this.orderUrl, { customer, products }, { responseType: 'text' });
  }
}
