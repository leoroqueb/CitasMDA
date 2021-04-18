import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCitaPage } from './edit-cita.page';

const routes: Routes = [
  {
    path: '',
    component: EditCitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCitaPageRoutingModule {}
