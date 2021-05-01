import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { UsuariosI } from '../models/users.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usersCollection: AngularFirestoreCollection<UsuariosI>;

  userConnection: Observable<UsuariosI>
  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth
  ) { 
    this.usersCollection = this.afs.collection(`usuarios`);
  }

  registerData(user: UsuariosI): Promise<void>{
    return this.usersCollection.doc(user.email).set(user);
  }
  
  updateUsuario(usuario: UsuariosI) {
    return this.usersCollection.doc(usuario.email).update(usuario);
  }

  async getMyselfData(): Promise<Observable<UsuariosI>>{
    this.userConnection = this.usersCollection.doc<UsuariosI>((await this.afauth.currentUser).email).valueChanges();
    return this.userConnection;
  }
}
