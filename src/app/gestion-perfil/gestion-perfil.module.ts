import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionPerfilPageRoutingModule } from './gestion-perfil-routing.module';

import { GestionPerfilPage } from './gestion-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionPerfilPageRoutingModule
  ],
  declarations: [GestionPerfilPage]
})
export class GestionPerfilPageModule {}
