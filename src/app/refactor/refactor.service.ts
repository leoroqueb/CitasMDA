import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UsuariosI } from '../models/users.model';
@Injectable({
    providedIn: 'root'
    })
export class Refactor {
    user: UsuariosI;
    constructor(
       public toastController: ToastController
    ){}


    async presentToast(msg: string) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }

   
}

@Injectable({
  providedIn: 'root'
  })
export class DbRefactor {
  constructor(){}

  disconnectFromDB(dbSubscription?: Subscription, dbSubscriptionArray?: Subscription[]){
    if(dbSubscriptionArray){
      dbSubscriptionArray.forEach(element => {
        element.unsubscribe();
      });
      if(dbSubscription){
        dbSubscription.unsubscribe();
      }
    }else{
      dbSubscription.unsubscribe();
    }
    
  }
}