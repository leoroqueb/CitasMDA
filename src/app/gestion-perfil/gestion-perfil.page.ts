import { Component, OnInit } from '@angular/core';
import { UsuariosI } from '../models/users.model';
import { UsuariosService } from '../providers/usuarios.service';
import { Router } from '@angular/router';
import { Refactor } from '../refactor/refactor.service';

@Component({
  selector: 'app-gestion-perfil',
  templateUrl: './gestion-perfil.page.html',
  styleUrls: ['./gestion-perfil.page.scss'],
})
export class GestionPerfilPage implements OnInit {
  userInfo: UsuariosI;
  campos = {
    direccion: '',
    telefono: '',
  }; 


  constructor(
    private userService: UsuariosService,
    private router: Router,
    private refactor: Refactor
  ) { }

  ngOnInit() {
    this.showUserInfo();
  }

  showUserInfo(){
    this.userService.getMyselfData().then(sus => {
      sus.subscribe(data => {
        this.userInfo = data;
      })
    })
  }

  modifyData(){
    let modifiedUser: UsuariosI = this.userInfo;
    if(this.campos.direccion != ''){
      modifiedUser.direccion = this.campos.direccion;
    }
    if(this.campos.telefono != ''){
      modifiedUser.telefono = this.campos.telefono;
    }
    this.userService.updateUsuario(modifiedUser)
    .then(() => {
      this.router.navigateByUrl('home');
      this.refactor.presentToast("Sus datos han sido modificados correctamente.")
    })
    .catch(error => {
      this.router.navigateByUrl('home');
      this.refactor.presentToast("Ha habido un problema. Inténtelo de nuevo más tarde." + error);
    });
    
  }

}
