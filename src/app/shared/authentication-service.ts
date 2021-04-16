import { Injectable, NgZone } from '@angular/core';
import { User } from "./user";
import { Router } from "@angular/router";
// import { AngularFireAuth }  from '@angular/fire/auth';
import * as firebase from 'firebase/app';
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: any;

  constructor(
    // public afStore: AngularFirestore,
    // public ngFireAuth: AngularFireAuth,
    // public router: Router,  
    // public ngZone: NgZone ,
    // private authFire: AngularFireAuth
  ) {}

  // Login in with email/password
  SignIn(email, password) {
    // return this.authFire.signInWithEmailAndPassword(email, password)
  }

  // Register user with email/password
  RegisterUser(email, password) {
    // return this.authFire.createUserWithEmailAndPassword(email, password)
  }
  
  // Recover password
  PasswordRecover(passwordResetEmail) {
    // return this.authFire.sendPasswordResetEmail(passwordResetEmail)
    // .then(() => {
    //   window.alert('Password reset email has been sent, please check your inbox.');
    // }).catch((error) => {
    //   window.alert(error)
    // })
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }


  // Auth providers
  AuthLogin(provider) {
    // return this.authFire.signInWithPopup(provider)
    // .then((result) => {
    //    this.ngZone.run(() => {
    //       this.router.navigate(['home']);
    //     })
    //   this.SetUserData(result.user);
    // }).catch((error) => {
    //   window.alert(error)
    // })
  }

  // Store user in localStorage
  SetUserData(user) {
    // const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    // const userData: User = {
    //   uid: user.uid,
    //   email: user.email,
    //   displayName: user.displayName,
    //   photoURL: user.photoURL,
    //   emailVerified: user.emailVerified
    // }
    // return userRef.set(userData, {
    //   merge: true
    // })
  }

  // Sign-out 
  SignOut() {
    // return this.authFire.signOut().then(() => {
    //   localStorage.removeItem('user');
    //   this.router.navigate(['login']);
    // })
  }

  

}