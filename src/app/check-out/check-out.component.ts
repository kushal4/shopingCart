import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit,OnDestroy {
  shipping = {
      name:null,
      addressLine1:null,
      addressLine2:null,
      city:null,
  };
  carts={};
  items=[];
  itemsCount=0;
  userId;
  cartSubscription:Subscription;
  userSubscription;
  cartTotalPrice;
  constructor(private router:Router,
    private authService:AuthService,
    private shoppingCartService:ShoppingCartService,
               private orderService:OrderService){

  }

  ngOnInit(){
    let shoppingCart =new ShoppingCart(this.shoppingCartService);
   this.userSubscription= this.authService.user$.subscribe(user=>{
     // console.log(user);
     this.userId=user.uid;
    });
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
      this.cartSubscription=resolve_arr[1];
     // this.carts_items=Object.keys(carts).length;
    //console.log(this.carts);


    });
  }

  ngOnDestroy(){
      this.cartSubscription.unsubscribe();
      this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    console.log(this.carts);


    //console.log(items);
    //let plainOrder={};
    let order= new Order(this.userId,this.shipping,this.carts) as Object;
    //Object.assign(plainOrder,order)
    let orderString=JSON.stringify(order);
    let order_obj=JSON.parse(orderString);
    console.log(orderString);

   let result= await this.orderService.placeorder(order_obj);

   let orderId=result.id;
   this.router.navigate(['/order-success',orderId]);
  }
}
