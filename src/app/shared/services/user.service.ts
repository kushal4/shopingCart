import { AppUser } from 'shared/models/app-user';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Injectable } from '@angular/core';
import { Action } from 'angularfire2/database';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:AngularFirestore) {

   }

   save(user:firebase.User){
      //  let val={
      //    name:user.displayName,
      //    email:user.email
      //  }
       this.db.collection("users").doc(user.uid).update({
          name:user.displayName,
          email:user.email
       });
      };

      get(uid:string) {
        //console.log("change called");
        //return this.db.collection("users").doc(uid).snapshotChanges();
        return this.db.doc<AppUser>(`users/${uid}`).valueChanges()
      }

   }
