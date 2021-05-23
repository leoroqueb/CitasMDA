import { Component, OnInit } from '@angular/core';
import {ToastController} from '@ionic/angular';
import { UsuariosI } from '../models/users.model';
import { UsuariosService } from '../providers/usuarios.service';
import { ActivatedRoute } from '@angular/router';
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
    public toastController: ToastController,
    private userService: UsuariosService,
    private actRoute: ActivatedRoute,
    private refactor: Refactor,
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

}
