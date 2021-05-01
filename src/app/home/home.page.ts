import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UsuariosI } from '../models/users.model';
import { AuthService } from '../providers/auth.service';
import { UsuariosService } from '../providers/usuarios.service';
import { CitaI } from '../models/citas';
import { CitasService } from '../providers/citas.service';
import { Router } from '@angular/router';
import {ToastController} from '@ionic/angular';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  myDataConnection: Subscription  
  myData: UsuariosI;
  Citas: any = [];
  constructor(
    private authService: AuthService,
    private userService: UsuariosService,
    private citasService: CitasService,
    private router: Router,
    public toastController: ToastController,
  ) {
  }

  async ngOnInit(){
    this.myDataConnection = (await this.userService.getMyselfData()).subscribe(data => {
      this.myData = data;

      this.citasService.getAppointments(this.myData.dni).subscribe(data => {
        if(data != undefined){
          this.Citas.push(data);
          console.log(this.Citas);
        } else {
          this.Citas = null;
        }
      });

    });
  }

  deleteCita(dni) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Vas a proceder a eliminar una cita",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('eliminando cita', dni);
        this.citasService.deleteCita(dni)
        this.router.navigate(['home']);
        Swal.fire(
          'Eliminada',
          'Tu cita ha sido eliminada.',
          'success'
        )
      }
    })
  }  

}
