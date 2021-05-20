import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalHorarioPage } from '../modal-horario/modal-horario.page';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage {

  constructor(public modalController: ModalController) { }

  // Editar horario
  editarHorario() {
    // ¡OJO LEO QUE NOSOTROS SOMOS RETRASADOS! Es YYYY/MM/DD para q rule el datepicker
    // Para resolverte por si las moscas te peche el metodo fixDate()

    const dia = '2021/05/25';
    //const dia = this.fixDate('25/05/2021');
    const horario = '12:00';
    const aforo = '7';
    this.presentEditModal(dia, horario, aforo);
  }

  // Nuevo horario
  newHorario() {
    this.presentNewModal();
  }

  // Modal Editar Horario
  async presentEditModal(dia, horario, aforo) {
    const modal = await this.modalController.create({
      component: ModalHorarioPage, 
      cssClass: 'my-custom-class',
      componentProps: {
        title: 'Editar horario',
        dia,
        horario,
        aforo,
        edit: true
      }
    });
    return await modal.present();
  }

  // Modal Nuevo Horario
  async presentNewModal() {
    const modal = await this.modalController.create({
      component: ModalHorarioPage,
      cssClass: 'my-custom-class',
      componentProps: {
        title: 'Nuevo horario',
        edit: false
      }
    });
    return await modal.present();
  }

  fixDate(fecha){
    const fechas = fecha.split('/');
    return(fechas[2] + '/' + fechas[1] + '/' + fechas[0]);
  }

}
