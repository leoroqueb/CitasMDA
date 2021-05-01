import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {ToastController} from '@ionic/angular';
import { UsuariosI } from '../models/users.model';
import { UsuariosService } from '../providers/usuarios.service';
import { CitasService } from '../providers/citas.service';




@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.page.html',
  styleUrls: ['./solicitar.page.scss'],
})
export class SolicitarPage implements OnInit {

  customDayShortNames = ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab'];
  minDate: string = new Date().toISOString();
  selectedDate: string = new Date().toISOString();
  hourValues = ['9', '10', '11', '12', '13', '14'];
  minuteValues = ['0','20','40'];

  daySelected = '';
  hourSelected = '';
  userInfo: UsuariosI;

  id: any;

  constructor(
    public toastController: ToastController,
    private userService: UsuariosService,
    private citasService: CitasService,
    ) { }

  ngOnInit() {
    this.showUserInfo();
  }
  
  
  showUserInfo(){
    this.userService.getMyselfData().then(sus => {
      sus.subscribe(data => {
        this.userInfo = data;
      })
    })
  }

  /**
   * Método que tras validar las fechas, envía al backend los datos
   */
  onSubmit(user: UsuariosI){
    if(this.validator()){
      const fecha = this.daySelected.toString().split('T')[0];
      let hora = this.hourSelected.toString().split('T')[1];

      hora = hora.split(':')[0] + ':' + hora.split(':')[1];
    
      // [0] Año
      // [1] Mes
      // [2] Día
      const fechas = fecha.split('-');
      const fechaModificada = fechas.reverse().join('-');
      if(this.checkCapacityAvailable(fechaModificada, hora)){
        this.citasService.addAppointment(user, fechaModificada, hora);
      }else{

      }
    }
  }


  checkCapacityAvailable(day: string, schedule: string): boolean{
    return false;
  }

  /**
   * Valida los campos y muestra un pop-up en caso de fallo
   */
  validator(){
    if($('#fecha').val().toString() === ''){
      this.presentToast('Selecciona una fecha para continuar').then(r => false);
      return false;
    }else if($('#hora').val().toString() === ''){
      this.presentToast('Selecciona una hora para continuar').then(r => false);
      return false;
    }
    return true;
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    await toast.present();
  }

  async presentToastWithOptions() {
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
  }
}
