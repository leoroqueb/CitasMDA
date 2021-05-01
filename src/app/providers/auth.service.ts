import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public credentials: firebase.auth.UserCredential | PromiseLike<firebase.auth.UserCredential>;
  constructor(
    public afireauth: AngularFireAuth, 
    private afs: AngularFirestore,
    private router: Router
  ) { }

    //REGISTRO USUARIO CON EMAIL Y CONTRASEÑA
  async registerUser(email:string, password:string): Promise<firebase.auth.UserCredential>{
    try {    
          //Intentamos el registro, enviamos email de verificación y actualizamos perfil del usuario 
      this.credentials = await this.afireauth
        .createUserWithEmailAndPassword(email, password);  
      return this.credentials;
    } catch (error) {
      alert(error);      
    }
  }
    //LOGIN USER CON EMAIL Y CONTRASEÑA
  async loginUser(email: string, password: string): Promise<any>{
    try {
      //Obtenemos las credenciales del inicio de sesion
      const {user} = await this.afireauth.signInWithEmailAndPassword(email, password);
      if(user){
        //Si todo ha ido bien, actualizamos las credenciales   
        this.updateCredencialData(user);
        return user;
      }
    } catch (error) {
      alert("Los datos introducidos no son correctos " + error)
    }
  }

  //Actualiza las credenciales del usuario
  async updateCredencialData(user: any){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`credencialesUsers/${user.email}`);
    const userProfileDocument: any = {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified
    };
    return userRef.set(userProfileDocument, {merge: true});
  }

  async logOut(){
    this.afireauth.signOut()
    .then(() => this.router.navigate(['login']));
  }
}
