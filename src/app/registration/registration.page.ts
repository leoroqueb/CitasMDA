import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { Refactor } from '../refactor/refactor.service';
import * as $ from 'jquery';
import { UsuariosI } from '../models/users.model';
import { UsuariosService } from '../providers/usuarios.service';
import { CitasService } from '../providers/citas.service';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  public register = false;
  public forms = {
    form1: true,
    form2: false,
    form3: false
  };
  campos = {
    email: '',
    password: '',
    nombre: '',
    apellidos: '',
    genero: '',
    direccion: '',
    telefono: '',
    dni: '',
    ss: ''
  };
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UsuariosService,
    private refactor: Refactor,
    private citasService: CitasService,
    public toastController: ToastController
  ) { }

  ngOnInit(){}

  signUp(){
    let userProfile: UsuariosI = {
      direccion: this.campos.direccion,
      apellidos: this.campos.apellidos,
      dni: this.campos.dni,
      email: this.campos.email,
      genero: this.campos.genero,
      nombre: this.campos.nombre,
      ss: this.campos.ss,
      telefono: this.campos.telefono
    };

    // Validamos los ultimos campos antes del registro
    if(this.campos.genero === ''){
      this.presentToast('Introduce tu género correctamente');
    }else if(this.campos.direccion === ''){
      this.presentToast('Introduce una dirección correcta');
    }else if(this.campos.telefono === ''){
      this.presentToast('Introduce un teléfono válido');
    }else{
      // Creamos el usuario
      this.authService.registerUser(this.campos.email, this.campos.password)
        .then(() => {
          this.userService.registerData(userProfile)
            .then(() =>{
              this.refactor.presentToast("Cuenta creada correctamente");
              this.router.navigateByUrl('home');
            })
            .catch((err) => this.refactor.presentToast("ERROR: " + err));
          this.citasService.registerUserToAppointmentsBD(userProfile.dni);
        })
        .catch(err => this.refactor.presentToast("ERROR: " + err));
    }
  }

  setGender(ev){
    this.campos.genero = ev.detail.value;
  }

  next(){

    // Del 2 al 3
    if(this.forms.form2 === true){
      // Comprobamos que no están vacios los campos
      if(this.campos.dni === ''){
        this.presentToast('Introduce tu DNI');
      }else if(this.campos.nombre === ''){
        this.presentToast('Introduce tu nombre');
      }else if(this.campos.apellidos === ''){
        this.presentToast('Introduce tus apellidos');
      }else if(this.campos.ss === ''){
        this.presentToast('Introduce tu número de la seguridad social');
      }else{
        this.forms.form2 = false;
        this.forms.form3 = true;
        $('#progressbar').val('1');
        $('#subtitle').text('¡Listo!');
        this.register = true;
      }
    }

    // Del 1 al 2
    if(this.forms.form1 === true){
      // Comprobamos que no están vacios los campos
      if(this.campos.email === ''){
        this.presentToast('Introduce un correo electrónico válido');
      }else if(this.campos.password === ''){
          this.presentToast('Introduce una contraseña válida');
      }else{
        this.forms.form1 = false;
        this.forms.form2 = true;
        $('#progressbar').val('0.5');
        $('#subtitle').text('Un poco más...');
      }
    }
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500
    });
    toast.present();
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
