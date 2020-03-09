import { take, switchMap } from 'rxjs/operators';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/app-product';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent  {

  products:Product[]=[];
  filterProducts:Product[];
  categories;
  category;
  constructor(
    route:ActivatedRoute,
    productService:ProductService,
    categoryService:CategoryService) {
    this.categories=categoryService.getAll()["categories"];
    // productService.getAll().subscribe(products=>{
    //   this.products=products;
    //  // console.log(this.products);

    // //console.log(this.categories);
    // route.queryParamMap.subscribe(params=>{
    //   this.category=params.get('category');
    //  console.log(this.category);
    //  this.filterProducts=(this.category)? this.products.filter(p=>p.category===this.category) :this.products;
    // });

    // });

    productService.getAll().
    pipe(switchMap(products => {
        this.products=products;
        console.log(products);
        return route.queryParamMap;
    })).subscribe(params=>{
        this.category=params.get('category');
       console.log(this.category);
       this.filterProducts=(this.category)? this.products.filter(p=>p.category===this.category) :this.products;
      });



   }



}
