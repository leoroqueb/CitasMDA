import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {ToastController} from '@ionic/angular';
import { Router } from '@angular/router';
import { CitasService } from '../providers/citas.service';
import { FormGroup, FormBuilder } from "@angular/forms";


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

  citaForm: FormGroup;

  constructor(
    public toastController: ToastController,
    private router: Router,
    private citasService: CitasService,
    public fb: FormBuilder
    ) { }

  ngOnInit() {
    this.citaForm = this.fb.group({
      dni_usuario: [''],
      estado: [''],
      fecha: ['2021-10-01'],
      hora: ['09:20'],
      medico: [''],
      lugar: ['']
    })
  }

  /**
   * Método que tras validar las fechas, envía al backend los datos
   */
  onSubmit(){
    if (!this.citaForm.valid) {
      this.validator();
      return false;
    } else {
      this.citasService.createCita(this.citaForm.value).then(res => {
        console.log(res)
        this.citaForm.reset();
        this.router.navigate(['/citas']);
      }).catch(error => console.log(error));

    }
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
