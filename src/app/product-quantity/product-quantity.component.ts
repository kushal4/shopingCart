import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../models/app-product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent  {

  @Input('product') product:Product;
  @Input('shopping-cart') shoppingCart;
  @Input('items') items;
  item;
  constructor(private cartService:ShoppingCartService) { }

  addToCart(){
    this.item.quantity +=1;
    this.cartService.addToCart(this.product);

  }

  removeFromCart(){
    this.item.quantity-=1;
    console.log(this.items);
    if(this.item.quantity==0){
      this.items.splice(this.item,1);
    }
    this.cartService.removeFromCart(this.product);
  }

  getQuantity(){
    if(!this.shoppingCart) return 0;
    this.item= this.shoppingCart[this.product.id];
    return this.item ? this.item.quantity : 0;

  }


}
