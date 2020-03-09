import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<firebase.User>;
  constructor(private afAuth:AngularFireAuth,private route:ActivatedRoute,private router:Router,
    private userService:UserService) {
    this.user$=afAuth.authState;
   }

   GoogleAuth() {
    // console.log("call it notw");
    let returnUrl=this.route.snapshot.queryParams['returnUrl'] || "/";
    localStorage.setItem("returnUrl",returnUrl);
    //console.log(returnUrl);
    return this.AuthLogin(new auth.GoogleAuthProvider()).then(res=>{
      this.user$.subscribe(user=>{
        if(user){
          console.log(user);
          this.userService.save(user);
        }

      })

      this.router.navigate([returnUrl]);
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!')
    }).catch((error) => {
        console.log(error)
    })
  }

  logout(){
    this.afAuth.auth.signOut();

  }

  get appUser$() : Observable<AppUser>{
    return this.user$
      .pipe(switchMap(user => {
        if(user){
          console.log(user.uid);
          return this.userService.get(user.uid);
        }
        return of(null);

      }));
  }
}
