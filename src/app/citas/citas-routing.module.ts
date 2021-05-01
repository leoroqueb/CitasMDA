import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitasPage } from './citas.page';

const routes: Routes = [
  {
    path: '',
    component: CitasPage
  },
  {
    path: 'solicitar',
    loadChildren: () => import('../solicitar/solicitar.module').then( m => m.SolicitarPageModule)
  },
  {
    path: 'edit-cita/:id',
    loadChildren: () => import('../edit-cita/edit-cita.module').then( m => m.EditCitaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasPageRoutingModule {}
