import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../shared/product';

@Component({
  selector: 'app-product-input-form',
  templateUrl: './product-input-form.component.html',
  styleUrls: ['./product-input-form.component.scss']
})
export class ProductInputFormComponent implements OnInit {
  @Input('form')
  productForm = new FormGroup({})

  @Output('onSubmit')
  submitEmitter = new EventEmitter<Product>();

  @Output('onCancel')
  cancelEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitEmitter.emit(this.productForm.value);
  }

  onCancel(): void {
    this.cancelEmitter.emit();
  }

}
