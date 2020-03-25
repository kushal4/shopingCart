import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Product } from 'shared/models/app-product';
//import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productCollection;
  productall;
  constructor(private db:AngularFirestore) {
   // this.productCollection = db.collection('products');
   }

  create(product){
    this.db.collection("products").add(product);
  }

  getAll(){
    const collection =this.db.collection("products");
//      const products$ = collection.valueChanges()
//   .pipe(
//     map(products => {
//      // const user = users[0];
//       console.log(products);
//       return products;
//     })
//   );

//   this.productall = this.db.collection("products").snapshotChanges().pipe(map(actions => {
//     return actions.map(a => {
//       const data = a.payload.doc.data() as Product
//       const id = a.payload.doc.id;
//       return { id, ...data };
//     })
// }));

return collection.snapshotChanges().pipe(map(actions => {
  return actions.map(a => {
    const data = a.payload.doc.data() as Product;
    data["id"] = a.payload.doc.id;
    return data;
  });

}));
}

get(productId){
  return this.db.doc<Product>(`products/${productId}`).valueChanges()
}

update(productId,product){
  return this.db.collection("products").doc(productId).update(product);
}

delete(productId){
 return  this.db.collection("products").doc(productId).delete();
}

}
