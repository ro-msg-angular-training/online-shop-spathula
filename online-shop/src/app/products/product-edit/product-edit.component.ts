import { Component, enableProdMode, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../shared/product';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  product!: Product;

  productForm = this.formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    image: [''],
    price: ['', [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: ProductService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getProduct(id).subscribe(product => { 
      this.product = product;
      this.productForm.patchValue(this.product);
    });
  }
  
  editProduct(): void {
    if(confirm("Save the changes made to this product?")) {
      this.service.editProduct(this.product.id, this.productForm.value).subscribe();
      alert("Changes have been saved");
      this.location.back();
    }
  }

  cancelEdit(): void {
    this.location.back();
  }

}
