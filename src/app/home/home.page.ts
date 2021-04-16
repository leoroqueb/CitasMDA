import { Component } from '@angular/core';
import { HorariosI } from '../models/usuarios.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private horario: HorariosI
  ) {
    this.horario = {
      hora: "9:00",
      aforo: {
        actual: 0,
        maximo: 5
      }
    }
  }

}
