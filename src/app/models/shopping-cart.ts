import { Subscription, of } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { rejects } from 'assert';
import { Product } from './app-product';
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
   let sub= (await this.shoppingCartService.getCart()).snapshotChanges()
    .subscribe(actions=>{
        actions.map(a => {
        //const data = a.payload.doc.data();
        cart_arr[a.payload.doc.id]=  a.payload.doc.data();
      //  console.log(cart_arr);
      });
      let resolve_arr=[cart_arr,sub]
      resolve(resolve_arr);

     // return cart_arr;
    });
  })

}


getQuantity(product :Product,items){
  let item= items[product.id];
  return item ? item.quantity : 0;

}

test(){
  console.log("sfsf");
}

}
