import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { OrderService } from '../shared/order.service';
import { CartItem } from '../shared/cart-item.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { selectCartItems } from 'src/app/store/selectors/shopping-cart.selectors';
import { PlaceOrder, RemoveCartItem } from 'src/app/store/actions/shopping-cart.actions';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  displayedColumns: string[] = ['category', 'productName', 'price', 'quantity', 'remove']
  cart$ = this.store.pipe(select(selectCartItems));

  constructor(
    private store: Store<AppState>,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  checkOut(): void {
    this.store.dispatch(new PlaceOrder());
  }

  removeFromCart(id: number): void {
    this.store.dispatch(new RemoveCartItem(id));
  }

}
