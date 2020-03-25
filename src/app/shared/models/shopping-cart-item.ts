import { Product } from './app-product';

export class ShoppingCartItem{
  //product:Product;
  //quantity:number;

  constructor(public product,public quantity){

  }
  get TotalPrice(){
    return this.product.price * this.quantity;
  }
}
