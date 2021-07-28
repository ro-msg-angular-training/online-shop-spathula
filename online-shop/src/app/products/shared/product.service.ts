import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Product } from './product';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'http://localhost:3000/products'

  constructor(
    private httpClient: HttpClient,
    private orderService: OrderService
    ) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productsUrl)
      .pipe(catchError(this.handleError));
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.productsUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addToCart(product: Product): void {
    this.orderService.addToCart(product);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`${this.productsUrl}/${id}`)
      .pipe(catchError(this.handleError));
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
