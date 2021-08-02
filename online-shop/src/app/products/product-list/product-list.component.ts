import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth.service';
import { GetProducts } from 'src/app/store/actions/product.actions';
import { selectProductList } from 'src/app/store/selectors/product.selectors';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['category', 'productName', 'price', 'details']
  products$ = this.store.pipe(select(selectProductList));

  constructor(
    private store : Store<AppState>,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetProducts());
  }

  get isAdmin() {
    return this.authService.getCurrentUser.roles.includes("admin");
  }

  get isCustomer() {
    return this.authService.getCurrentUser.roles.includes("customer");
  }
}
