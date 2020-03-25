import { AuthService } from 'shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Order } from 'shared/models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit,OnDestroy {

  shipping = {
    name:null,
    addressLine1:null,
    addressLine2:null,
    city:null,
};

@Input('carts') carts;
userId;
userSubscription:Subscription;

  constructor(private router:Router,
    private authService:AuthService,
    private orderService:OrderService) { }

  ngOnInit(): void {
    this.userSubscription= this.authService.user$.subscribe(user=>{
      // console.log(user);
      this.userId=user.uid;
     });
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

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
