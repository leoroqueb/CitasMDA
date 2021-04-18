import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { UsuariosI } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  userCollection: AngularFirestoreCollection<UsuariosI>;
  constructor(
    private afs: AngularFirestore
  ) { 
    this.userCollection = this.afs.collection(`usuarios`);
  }

  registerData(user: UsuariosI): Promise<void>{
    return this.userCollection.doc(user.dni).set(user);
  }
}
