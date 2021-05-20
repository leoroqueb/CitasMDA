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

    dayReformat(day:string): string{
      let auxiliar:string = "";
      let newDay:string[];
      
      if(day.length > 10){
        auxiliar = day.substring(0,10);
        newDay = auxiliar.split("-");
        return newDay.reverse().join("-");
      }else{
        console.log("El parámetro introducido no es correcto o la fecha ya ha sido modificada.");
        return null;
      }
        
      
      
    }

    scheduleReformat(schedule:string): string{
      let newSchedule:string = "";
        if(schedule.length > 5){
          newSchedule = schedule.substring(11,16);
          return newSchedule;
        }else{
          console.log("El parámetro introducido no es correcto o la fecha ya ha sido modificada.");
          return null;
        }
      
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