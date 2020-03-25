import { Subscription } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit,OnDestroy {

  carts={};
  items=[];
  itemsCount=0;
  userId;
  subscription:Subscription;
  cartTotalPrice;
  constructor(private shoppingCartService:ShoppingCartService){

  }

  ngOnInit(){
    let shoppingCart =new ShoppingCart(this.shoppingCartService);
    (shoppingCart.getItems()).then((resolve_arr)=>{
      this.carts=resolve_arr[0];
      this.items=Object.values(this.carts);
      this.cartTotalPrice=0;
      console.log(this.items);
      for( let  item in this.items){
        this.itemsCount+=this.items[item]["quantity"];
        this.cartTotalPrice+=(this.items[item]["quantity"] * this.items[item]["product"]["price"])
      }
      //console.log(this.cartTotalPrice);
      this.subscription=resolve_arr[1];
     // this.carts_items=Object.keys(carts).length;
    //console.log(this.carts);


    });
  }

  ngOnDestroy(){
      this.subscription.unsubscribe();
  }


}
