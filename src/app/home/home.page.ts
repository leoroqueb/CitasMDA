import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UsuariosI } from '../models/users.model';
import { AuthService } from '../providers/auth.service';
import { UsuariosService } from '../providers/usuarios.service';

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
    private userService: UsuariosService
  ) {

  }

  async ngOnInit(){
    this.myDataConnection = (await this.userService.getMyselfData()).asObservable()
    .subscribe(data =>  this.myData = data);
  }

  

}
