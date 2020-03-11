import { ShoppingCartService } from './shopping-cart.service';
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
}
