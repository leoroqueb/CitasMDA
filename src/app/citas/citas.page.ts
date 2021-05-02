import { Component, OnInit } from '@angular/core';
import { CitaI } from '../models/citas.model';
import { CitasService } from '../providers/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {

  Citas = [];

  constructor(
    private citasService: CitasService
  ) { }

  ngOnInit() {
/*     let citaRes = this.citasService.getAppointments(); */
  }


  deleteCita(id) {
    console.log(id)
    if (window.confirm('Do you really want to delete?')) {
      this.citasService.deleteCita(id)
    }
  }

}
