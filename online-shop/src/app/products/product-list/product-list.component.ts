import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../shared/product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['category', 'productName', 'price', 'details']
  products: Product[] = [];

  constructor(
    private service : ProductService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  get isAdmin() {
    return this.authService.getCurrentUser.roles.includes("admin");
  }

  get isCustomer() {
    return this.authService.getCurrentUser.roles.includes("customer");
  }

  getProducts(): void {
    this.service.getProducts().subscribe(products => this.products = products);
  }

}
