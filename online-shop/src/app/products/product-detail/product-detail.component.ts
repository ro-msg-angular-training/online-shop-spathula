import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product : Product | undefined;

  constructor(
    private route : ActivatedRoute,
    private service : ProductService
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    
    this.service.getProduct(id).subscribe(product => this.product = product);
  }

}
