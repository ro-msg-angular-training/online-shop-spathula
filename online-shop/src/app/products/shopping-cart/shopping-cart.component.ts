import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { CartItem } from '../shared/cart-item.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart: CartItem[] = [];

  constructor(
    private service : OrderService
  ) { }

  ngOnInit(): void {
    this.service.getShoppingCart().subscribe(cart => this.cart = cart);
  }

  checkOut(): void {
    this.service.placeOrder().subscribe(
      data => {
        alert("Order has been placed succesfully");
        this.service.clearShoppingCart();
      },
      error => alert(error));
  }

}
