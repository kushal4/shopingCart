import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth:AuthService,private userService:UserService ) {}

  canActivate() {

    return this.auth.appUser$.pipe(map(user=>{
      console.log(this.auth.appUser$);
     // console.log(user.payload.data());
     //console.log(user["isAdmin"]);
     return user["isAdmin"];
    }));
    //return this.auth.appUser$
      //.map(appUser => appUser.isAdmin);
  }

}
