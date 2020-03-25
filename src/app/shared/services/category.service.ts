import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import    categories  from  '../../admin/components/product-form/categories.json';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  category
  constructor(private db:AngularFireDatabase) {
   }

  getAll(){
  //   //console.log(this.db.collection("categories").get());
  //   return this.db.collection("categories").get().toPromise().then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //         // doc.data() is never undefined for query doc snapshots
  //         //console.log(doc.id, " => ", doc.data());
  //     });
  // })
    //console.log(categories);
    let ordCategories={};
    Object.keys(categories).sort().forEach(function(key) {
      ordCategories[key] = categories[key];
    });
    return ordCategories;

    }
  }
