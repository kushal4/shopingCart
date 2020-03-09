import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent  {
  appUser:AppUser;
  constructor(public auth:AuthService) {
   // afAuth.authState.subscribe(user=>this.user=user);
        auth.appUser$.subscribe(appUser=>{
          this.appUser=appUser;
        });
   }

   logout(){
     this.auth.logout();
   }




}
