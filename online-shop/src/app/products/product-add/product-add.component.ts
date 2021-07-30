import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../shared/product.service';

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
    private service: ProductService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  addProduct(): void {
    if(confirm("Save this product?")) {
      this.service.addProduct(this.productForm.value).subscribe();
      alert("Product has been saved");
      this.location.back();
    }
  }

  cancelAdd(): void {
    this.location.back();
  }

}
