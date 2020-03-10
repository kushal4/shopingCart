import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCartItemCount=0;
  carts;
  carts_items;
  items=[];

  constructor( private shoppingCartService:ShoppingCartService) { }

  async ngOnInit() {
      let shoppingCart =new ShoppingCart(this.shoppingCartService);
     (shoppingCart.getItems()).then(carts=>{
       this.carts=carts;
       this.carts_items=Object.keys(carts).length;
       //console.log(this.carts);
       for (let cart_id in this.carts){
          //console.log(cart);
          this.shoppingCartItemCount+=this.carts[cart_id]["quantity"];
          this.items.push(new ShoppingCartItem(this.carts[cart_id]["product"],this.carts[cart_id]["quantity"]));
       }

     });
  }

  get totalPrice(){
    let totalPrice=0;

    for (let cart of this.items){
       totalPrice+=cart["product"]["price"] * cart["quantity"];
    }

    return totalPrice;
  }

}
