import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { AddProduct } from 'src/app/store/actions/product.actions';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productForm = this.formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    image: [''],
    price: ['', [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  addProduct(product: Product): void {
    if(confirm("Save this product?")) {
      this.store.dispatch(new AddProduct(product));
    }
  }

  cancelAdd(): void {
    this.location.back();
  }

}
