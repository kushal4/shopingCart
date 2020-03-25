
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFirestore,private shoppingCartService:ShoppingCartService) { }

  async placeorder(order){
   let result= this.db.collection('orders').add(order);
   this.shoppingCartService.clearCart();
   return result;
  }

  fetchOrders(){
    let orders_arr={};
    return new Promise(resolve=>{
      let sub=this.db.collection("orders").snapshotChanges()
      .subscribe(actions=>{
          actions.map(a => {
          //const data = a.payload.doc.data();
          orders_arr[a.payload.doc.id]=  a.payload.doc.data();
        //  console.log(cart_arr);
        });
        let resolve_arr=[orders_arr,sub]
        resolve(resolve_arr);

       // return cart_arr;
      });
    })
    }
  }
