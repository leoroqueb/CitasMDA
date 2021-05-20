import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionPerfilPage } from './gestion-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: GestionPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionPerfilPageRoutingModule {}
