import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/app-product';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input('product') product:Product;
  @Input('show-actions') showActions=true;
  @Input('shopping-cart') shoppingCart={};
  items=[];
  constructor(private cartService:ShoppingCartService) {
    this.items=Object.values(this.shoppingCart);
    console.log(this.items);
  }

  addToCart(){
    this.cartService.addToCart(this.product);

  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
    let item= this.shoppingCart[this.product.id];
    return item ? item.quantity : 0;

  }


}
