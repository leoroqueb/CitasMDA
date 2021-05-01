import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UsuariosI } from '../models/users.model';
import { AuthService } from '../providers/auth.service';
import { UsuariosService } from '../providers/usuarios.service';
import { CitaI } from '../models/citas';
import { CitasService } from '../providers/citas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  myDataConnection: Subscription  
  myData: UsuariosI;
  constructor(
    private authService: AuthService,
    private userService: UsuariosService,
    private citasService: CitasService
  ) {

  }

  async ngOnInit(){
    this.myDataConnection = (await this.userService.getMyselfData()).asObservable()
    .subscribe(data => {
      this.myData = data;

      this.citasService.getAppointments(this.myData.dni).subscribe(data => {
        let Citas: CitaI[] = [];
        if(data != undefined){
          Citas = data;
        };
      });

    });
  }

  deleteCita(id) {
    console.log(id)
    if (window.confirm('Do you really want to delete?')) {
      this.citasService.deleteCita(id)
    }
  }
  

}
