import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {ToastController} from '@ionic/angular';
import { UsuariosI } from '../models/users.model';
import { UsuariosService } from '../providers/usuarios.service';
import { CitasService } from '../providers/citas.service';
import { CitaI } from '../models/citas.model';
import { ActivatedRoute } from '@angular/router';
import { Refactor } from '../refactor/refactor.service';




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
  updating: boolean;
  dni: string;
  Cita: CitaI[];


  constructor(
    public toastController: ToastController,
    private userService: UsuariosService,
    private citasService: CitasService,
    private actRoute: ActivatedRoute,
    private refactor: Refactor,
    ) { 
      this.dni = this.actRoute.snapshot.paramMap.get('dni');
    }

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
      //Formateamos fecha y hora de manera correcta
      const fecha = this.daySelected.toString().split('T')[0];
      let hora = this.hourSelected.toString().split('T')[1];

      hora = hora.split(':')[0] + ':' + hora.split(':')[1];
    
      // [0] Año
      // [1] Mes
      // [2] Día
      const fechas = fecha.split('-');
      const fechaModificada = fechas.reverse().join('-');

      //Hacemos la gestión de la BD. Comprobamos si el aforo no está lleno y añadimos la cita a la BD.
      this.citasService.checkCapacityAvailableAndAddAppointment('27-04-21', '9:20', user)
    }
  }



  /**
   * Valida los campos y muestra un pop-up en caso de fallo
   */
  validator(){
    if($('#fecha').val().toString() === ''){
      this.refactor.presentToast('Selecciona una fecha para continuar').then(r => false);
      return false;
    }else if($('#hora').val().toString() === ''){
      this.refactor.presentToast('Selecciona una hora para continuar').then(r => false);
      return false;
    }
    return true;
  }



}
