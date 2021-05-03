import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
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

    //LOS TOAST CON OPCIONES VAN A TENER QUE PROGRAMARSE POR INDIVIDUAL POR EL TEMA DEL HANDLER, SINO HAY QUE HACER UN ABSTRACT Y OVERRIDE Y ES UN COÑAZO
    /* async presentToastWithOptions() {
      const toast = await this.toastController.create({
        header: 'Toast header',
        message: 'Click to Close',
        position: 'top',
        buttons: [
          {
            side: 'start',
            icon: 'star',
            text: 'Favorite',
            handler: () => {
              console.log('Favorite clicked');
            }
          }, {
            text: 'Done',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      await toast.present();
  
      const { role } = await toast.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    } */
}