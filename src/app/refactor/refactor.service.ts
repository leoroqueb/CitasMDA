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

    getScheduleArray(from: string, to: string): string[]{
      let resultArray: string[] = [];
      let minutesFrom = parseInt(from.substring(3,5));
      let hourFrom = parseInt(from.substring(0,2));
      let minutesTo = parseInt(to.substring(3,5));
      let hourTo = parseInt(to.substring(0,2));

      if(hourTo >= hourFrom){
        let newHour: string = '';
        while(hourFrom <= hourTo){
          if(hourFrom != hourTo){
            if(minutesFrom == 0){
              newHour = hourFrom.toString() + ":" + minutesFrom.toString()+"0";
            }else{
              newHour = hourFrom.toString() + ":" + minutesFrom.toString();
            }
            resultArray.push(newHour);
            minutesFrom += 20;
            if(minutesFrom > 40){
              minutesFrom = 0;
              hourFrom ++;
            }
          }else{
            while (minutesFrom < minutesTo){
              if(minutesFrom == 0){
                newHour = hourFrom.toString() + ":" + minutesFrom.toString()+"0";
              }else{
                newHour = hourFrom.toString() + ":" + minutesFrom.toString();
              }
              resultArray.push(newHour);
              minutesFrom += 20;
            }
            //break the loop
            break;
          }
        }
        resultArray.push(to);
        return(resultArray);
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