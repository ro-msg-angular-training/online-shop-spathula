import { Component, enableProdMode, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from '../shared/product';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state/app.state';
import { EditProduct, GetProduct } from 'src/app/store/actions/product.actions';
import { selectSelectedProduct } from 'src/app/store/selectors/product.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  product$ = this.store.pipe(select(selectSelectedProduct));

  productForm = this.product$.pipe(map(product => this.formBuilder.group({
    id: [product?.id],
    name: [product?.name, Validators.required],
    category: [product?.category, Validators.required],
    image: [product?.image],
    price: [product?.price, [Validators.required, Validators.min(1)]],
    description: [product?.description, [Validators.required, Validators.minLength(10)]]
  })));

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location
    ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.store.dispatch(new GetProduct(id));

    
  }
  
  editProduct(product: Product): void {
    if(confirm("Save the changes made to this product?")) {
      this.store.dispatch(new EditProduct(product));
    }
  }

  cancelEdit(): void {
    this.location.back();
  }

}
