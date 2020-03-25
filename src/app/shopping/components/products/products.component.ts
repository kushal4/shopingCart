import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { take, switchMap } from 'rxjs/operators';
//import { CategoryService } from './../category.service';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/app-product';
import {map} from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit,OnDestroy {

  products:Product[]=[];
  filterProducts:Product[];
  cart;
  subscription:Subscription;
  category;
  constructor(
    private route:ActivatedRoute,
    private productService:ProductService,
    private shoppingCartService: ShoppingCartService) {
    //let cart= await shoppingCartService.getCart()
   // this.categories=categoryService.getAll()["categories"];
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




   }

  async ngOnInit(){

   this.populateProducts();
   this.populateCart();
  }

  private populateProducts(){
    this.productService.getAll().
    pipe(switchMap(products => {
        this.products=products;
        console.log(products);
        return this.route.queryParamMap;
    })).subscribe(params=>{
        this.category=params.get('category');
       console.log(this.category);
       this.applyFilter();
      });
  }

  private async populateCart(){
    let cart_arr={};
    this.subscription=(await this.shoppingCartService.getCart()).snapshotChanges().subscribe(actions=>{
      return actions.map(a => {
        //const data = a.payload.doc.data();
        cart_arr[a.payload.doc.id]=a.payload.doc.data();

       console.log(cart_arr);

       // data["id"] = a.payload.doc.id;
       // return data;
      });
    });
    this.cart=cart_arr;
  }

  private applyFilter(){
    this.filterProducts=(this.category)? this.products.filter(p=>p.category===this.category) :this.products;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }



}
