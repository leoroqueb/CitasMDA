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
  myDataConnection: Subscription;
  appointmentsConnection: Subscription;

  myData: UsuariosI;
  allApointments: CitaI[] = [];
  citas: CitaI[] = [];


  constructor(
    private userService: UsuariosService,
    private citasService: CitasService,
    private router: Router,
    private refactor: Refactor,
  ) {

  }

  async ngOnInit(){
    this.myDataConnection = (await this.userService.getMyselfData()).subscribe(user => {
      //Aquí cogemos los datos del usuario y mostramos sus citas asociadas.
      this.myData = user;
        this.showAppointments(user.dni);
      });    
  }

  showAppointments(dni:string){
    this.appointmentsConnection = this.citasService.getAppointmentsDoc(dni).subscribe(appointments => {
      //Tenemos que limpiar el array antes de actualizarlo. Si no, se van a repetir las citas.
      this.allApointments = [];

      //Recogemos de la BD todas las citas y las metemos en el array que las va a mostrar en pantalla
      appointments.pendientes.forEach(cita => {
        this.allApointments.push(cita);
      });
      appointments.modificadas.forEach(cita => {
        this.allApointments.push(cita);
      });
      appointments.finalizadas.forEach(cita => {
        this.allApointments.push(cita);
      });
      
    });
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
