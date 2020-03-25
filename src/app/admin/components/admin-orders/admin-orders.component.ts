import { Subscription } from 'rxjs';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit,OnDestroy{

  orders_obj;
  subscription:Subscription;
  ordersCount=0;
  constructor(private orderService:OrderService) {

   }

  async ngOnInit() {
    let resolve_arr=await this.orderService.fetchOrders();
    this.orders_obj=resolve_arr[0];
    this.subscription=resolve_arr[1];
    console.log(this.orders_obj);
    this.ordersCount=Object.keys(this.orders_obj).length;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
