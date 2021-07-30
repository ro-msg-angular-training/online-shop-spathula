import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { OrderService } from '../shared/order.service';
import { CartItem } from '../shared/cart-item.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  displayedColumns: string[] = ['category', 'productName', 'price', 'quantity', 'remove']
  dataSource = new MatTableDataSource<CartItem>([]);

  constructor(
    private service : OrderService,
    private location: Location
  ) { }

  get emptyCart() { 
    return this.dataSource.data.length === 0; 
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.service.getShoppingCart().subscribe(cart => {
      this.dataSource.data = cart;
    });
  }

  checkOut(): void {
    this.service.placeOrder().subscribe(
      data => {
        alert("Order has been placed succesfully");
        this.service.clearShoppingCart();
        this.location.back();
      },
      error => alert(error));
  }

  removeFromCart(id: number): void {
    this.service.removeFromCart(id).subscribe(cart => {
      this.dataSource.data = cart;
    });;
  }

}
