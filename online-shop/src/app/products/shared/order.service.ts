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

  private shoppingCart: CartItem[] = [];

  private orderUrl = 'http://localhost:3000/orders';

  constructor(private httpClient: HttpClient) { }

  addToCart(product: Product) {
    let item = this.shoppingCart.find(item => item.productId === product.id);

    if (item === undefined) {
      this.shoppingCart.push(new CartItem(product.id, product.name, product.price, 1));
    } else {
      item.quantity += 1;
    }
  }

  getShoppingCart(): Observable<CartItem[]> {
    return of(this.shoppingCart);
  }

  placeOrder() {
    let products = [...this.shoppingCart];
    let customer = "doej";
    return this.httpClient.post(this.orderUrl, { customer, products }, { responseType: 'text' })
      .pipe(catchError(this.handleError));;
  }

  clearShoppingCart() {
    this.shoppingCart.length = 0;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occured: ', error.error);
    } else {
      console.error(`Backend returned code ${error.status}: `, error.error);
    }

    return throwError('An error orccured, please try again later.');
  }
}
