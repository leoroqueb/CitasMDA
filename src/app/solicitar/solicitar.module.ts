import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitarPageRoutingModule } from './solicitar-routing.module';

import { SolicitarPage } from './solicitar.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    SolicitarPageRoutingModule
  ],
  declarations: [SolicitarPage]
})
export class SolicitarPageModule {}
