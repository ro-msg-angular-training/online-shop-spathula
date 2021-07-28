import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../shared/product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getProduct(id).subscribe(product => this.product = product);
  }

  addToCart(): void {
    this.service.addToCart(this.product);

    alert("Product has been added to the cart.");
    this.location.back();
  }

  deleteProduct(): void {
    if(confirm("Are you sure you want to delete this product?")) {
      this.service.deleteProduct(this.product.id).subscribe();
      alert("Product has been deleted.");
      this.location.back();
    }
  }

}
