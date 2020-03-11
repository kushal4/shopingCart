import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { Product } from "./models/app-product";
import { take } from "rxjs/operators";
import { pipe } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFirestore) {}



  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .collection("shopping-carts")
      .doc(`${cartId}`)
      .collection("items");
  }

  private create() {
    return this.db.collection("shopping-carts").add({
      dateCreated: new Date().getTime()
    });
  }

  async removeFromCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    console.log(cartId);
    let item$ = this.getItem(cartId, product.id);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe(item => {
        if (item) {
          console.log(item);
          if(item["quantity"]==0){
            console.log("delete it");
            item$.delete();
          }else{
            this.updateQuantity(item$, item, -1);
          }

        }
      });
  }

  updateQuantity(item$, item, change) {
    item$.update({
      quantity: item["quantity"] + change
    });
  }

  async clearCart(){
    console.log("clear cart");
    let cartId = await this.getOrCreateCartId();
    const qry= await this.db.collection('shopping-carts').doc(cartId).collection("items").ref.get();

    qry.forEach(doc => {
      doc.ref.delete();
    });
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem("cartId");
    //console.log("addToCart");
    if (cartId) return cartId;

    let result = await this.create();
    let newCartId = result.id;
    localStorage.setItem("cartId", newCartId);
    console.log(result.id);
    return newCartId;
    //  this.create().then(result=>{
    //    console.log(result.id);
    //    localStorage.setItem('cartId',result.id);
    //   return  this.getCart(result.id);
    //  });
  }

  private getItem(cartId, productId) {
    return this.db
      .collection("shopping-carts")
      .doc(`${cartId}/items/${productId}`);
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    console.log(cartId);
    let item$ = this.getItem(cartId, product.id);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe(item => {
        if (item) {
          this.updateQuantity(item$, item, 1);
        } else {
          item$.set({
            product: product,
            quantity: 1
          });
        }
      });
  }


}
