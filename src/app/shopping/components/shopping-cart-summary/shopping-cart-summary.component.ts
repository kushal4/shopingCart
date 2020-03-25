import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent implements OnInit{

  @Input('cart') cart=[];
  @Input('itemsCount') itemsCount;
  @Input('totalPrice') totalPrice=0;
  constructor() { }

  ngOnInit(){
    console.log(this.cart);
  }



}
