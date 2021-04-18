import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCitaPage } from './add-cita.page';

const routes: Routes = [
  {
    path: '',
    component: AddCitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCitaPageRoutingModule {}
