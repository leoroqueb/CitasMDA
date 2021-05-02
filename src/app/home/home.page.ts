import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CitaI } from '../models/citas.model';
import { UsuariosI } from '../models/users.model';
import { AuthService } from '../providers/auth.service';
import { CitasService } from '../providers/citas.service';
import { UsuariosService } from '../providers/usuarios.service';

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
    private authService: AuthService,
    private userService: UsuariosService,
    private citasService: CitasService
  ) {

  }

  ngOnInit(){
    this.userService.getMyselfData().then(data => this.myDataConnection =  data.subscribe(user => {
      //Aquí cogemos los datos del usuario
      this.myData = user;

      //nos conectamos a la bd de citas y las mostramos
      //PROBLEMA, LO ESTA MOSTRANDO REPETIDAS VECES
      this.citasService.getAppointments(this.myData.dni).subscribe(citas => {
        //Metemos en un array de tipo CitaI todas las citas de la BD del usuario
        citas.pendientes.forEach(cita => {
          this.allApointments.push(cita);
        })
        citas.modificadas.forEach(cita => {
          this.allApointments.push(cita);
        });
        citas.finalizadas.forEach(cita => {
          this.allApointments.push(cita);
        });
        
        //Muestra en el front todas las citas
        this.citas = this.allApointments;
        
      })
    }))
  }

  

}
