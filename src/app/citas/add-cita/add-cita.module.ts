import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCitaPageRoutingModule } from './add-cita-routing.module';

import { AddCitaPage } from './add-cita.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    AddCitaPageRoutingModule
  ],
  declarations: [AddCitaPage]
})
export class AddCitaPageModule {}
