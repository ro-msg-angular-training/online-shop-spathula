import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../shared/product';
import { ProductService } from '../shared/product.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AppState } from 'src/app/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { DeleteProduct, GetProduct } from 'src/app/store/actions/product.actions';
import { selectSelectedProduct } from 'src/app/store/selectors/product.selectors';
import { AddCartItem } from 'src/app/store/actions/shopping-cart.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product$ = this.store.pipe(select(selectSelectedProduct));
  id: number = 0;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private service: ProductService,
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.store.dispatch(new GetProduct(this.id));
  }

  addToCart(product: Product): void {
    this.store.dispatch(new AddCartItem(product));
  }

  get isAdmin() {
    return this.authService.getCurrentUser.roles.includes("admin");
  }

  get isCustomer() {
    return this.authService.getCurrentUser.roles.includes("customer");
  }

  deleteProduct(): void {
    if(confirm("Are you sure you want to delete this product?")) {
      this.store.dispatch(new DeleteProduct(this.id));
    }
  }
}
