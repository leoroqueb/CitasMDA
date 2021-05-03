import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CitaI } from '../models/citas.model';
import { UsuariosI } from '../models/users.model';
import { CitasService } from '../providers/citas.service';
import { UsuariosService } from '../providers/usuarios.service';
import { Refactor } from '../refactor/refactor.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  myDataConnection: Subscription  
  myData: UsuariosI;
  allApointments: CitaI[] = [];
  citas: CitaI[] = [];
  constructor(
    private userService: UsuariosService,
    private citasService: CitasService,
    private router: Router,
    private refactor: Refactor
  ) {

  }

  ngOnInit(){
    this.showUserInfo();
  }



  async showUserInfo(){
    (await this.userService.getMyselfData()).subscribe(user => {
      //Aquí cogemos los datos del usuario
      console.log("entro")
      this.myData = user;
      this.showAppointments(user.dni);
    });
  }

  showAppointments(dni: string){
      //nos conectamos a la bd de citas y las mostramos
      this.citasService.getAllApointmentsInAnArray(dni).then(data => {
        this.allApointments = data;
      })
     
  }

  doRefresh(ev, data: UsuariosI){
    this.showAppointments(data.dni);
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
  }

  editAppointment(appointment: CitaI){
    this.citasService.editing = true;
    this.citasService.appointmentToEdit = appointment;
    this.router.navigateByUrl('/solicitar');
  }

  deleteCita(appointment: CitaI){
    this.citasService.deleteAppointment(appointment).then(() => {
      this.refactor.presentToast("Su cita ha sido eliminada correctamente");
    });
    
  }

  

}
