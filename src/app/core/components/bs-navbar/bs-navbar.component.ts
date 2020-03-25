import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit  {
  appUser:AppUser;
  shoppingCartItemCount:number;
  constructor(public auth:AuthService,
    private shoppingCartService:ShoppingCartService) {
   // afAuth.authState.subscribe(user=>this.user=user);

   }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser=>{
      this.appUser=appUser;
    });
    let cart =await this.shoppingCartService.getCart()

    cart.snapshotChanges().subscribe(actions=>{
      console.log(actions.length);
      this.shoppingCartItemCount=0;
      let shoppingCart=new ShoppingCart(this.shoppingCartService,actions);
      this.shoppingCartItemCount=shoppingCart.TotalItemCount;
      //  actions.map(a => {
      //   //const data = a.payload.doc.data();
      //   let data=a.payload.doc.data();
      //   let quantity=data["quantity"];
      //   this.shoppingCartItemCount+=quantity;
      // });
    });
   }

   logout(){
     this.auth.logout();
   }




}
