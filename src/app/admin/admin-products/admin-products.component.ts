import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/app-product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit,OnDestroy {

  //products$;
  cols: any[];
  products:Product[];
  filterProducts:Product[];
  subscription:Subscription;
  constructor(productService:ProductService) {
     // this.products$=productService.getAll();
      this.subscription=productService.getAll()
      .subscribe(products=>this.filterProducts=this.products=products);
     // console.log(this.products$);
   }

   filter(query:string){
      //console.log(query);
      this.filterProducts=(query)?
      this.products.filter(p=> p.title.toLowerCase().includes(query.toLowerCase())):this.products;
   }

  ngOnInit(): void {

    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'price', header: 'Price' },
  ];
  console.log(this.cols);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
