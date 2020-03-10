import { Subscription, of } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { resolve } from 'dns';
import { rejects } from 'assert';
export class ShoppingCart{

  cart_items={};
  constructor(private shoppingCartService:ShoppingCartService,private actions=null){

  }
  get TotalItemCount(){
    let count=0;
    this.actions.map(a => {
      //const data = a.payload.doc.data();
      let data=a.payload.doc.data();
      let quantity=data["quantity"];
      count+=quantity;
    });

    return count;
  }


 async getItems(){
  let cart_arr={};
  return new Promise(async (resolve)=>{
    (await this.shoppingCartService.getCart()).snapshotChanges()
    .subscribe(actions=>{
        actions.map(a => {
        //const data = a.payload.doc.data();
        cart_arr[a.payload.doc.id]=  a.payload.doc.data();
      //  console.log(cart_arr);
      });
      resolve(cart_arr);

     // return cart_arr;
    });
  })

}




}
