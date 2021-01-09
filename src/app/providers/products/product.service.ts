import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private fireStore: AngularFirestore
  ) { }

  getProducts(){
    return this.fireStore.collection('products').valueChanges({ idField: 'id' });
  }
  addProduct(data){
    return this.fireStore.collection('products').add(data);
  }
  productById(id){
    return this.fireStore.collection('products').doc(id).ref.get();
  }
  updateProduct(id, data){
    return this.fireStore.collection('products').doc(id).update(data);
  }
  delete(id){
    return this.fireStore.collection('products').doc(id).delete();
  }
}
