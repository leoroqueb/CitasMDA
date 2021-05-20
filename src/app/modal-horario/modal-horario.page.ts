import {Component, Input, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AforoService } from '../providers/aforo.service';
import { Refactor } from '../refactor/refactor.service';

@Component({
  selector: 'app-modal-horario',
  templateUrl: './modal-horario.page.html',
  styleUrls: ['./modal-horario.page.scss'],
})
export class ModalHorarioPage implements OnInit{

  @Input() title: string;
  @Input() dia: string;
  @Input() horario: string;
  @Input() aforo: number;
  @Input() edit: boolean;

  customDayShortNames = ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab'];
  minDate: string = new Date().toISOString();
  selectedDate: string = new Date().toISOString();
  hourValues = ['9', '10', '11', '12', '13', '14'];
  minuteValues = ['0','20','40'];

  daySelected = '';
  fromHour = '';
  toHour = '';
  aforoSelected = 5; // Valor default

  constructor(
    public modalController: ModalController,
    private aforoService: AforoService,
    private refactor: Refactor,
    
    ) { }

  ngOnInit() {
    if(this.dia !== undefined && this.horario !== undefined){
      this.fromHour = this.horario;
      this.toHour = this.horario;
      this.daySelected = this.dia;
      this.aforoSelected = this.aforo;
    }
  }


  // Cerrar Horario
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  submitNuevo(){
    //this.refactor.dayReformat(this.daySelected);
    this.aforoService.addNewCapacity(this.daySelected, this.fromHour, this.aforoSelected)
    .then(() => {
      this.refactor.presentToast('El nuevo horario ha sido añadido con éxito.');
      this.dismiss();
    })
    .catch(() => {
      this.refactor.presentToast('Ha ocurrido un error, inténtelo de nuevo.');
      this.dismiss();
    });
  }

  submitEditar(){
    console.log(this.daySelected, this.fromHour, this.aforoSelected);
  }
}
