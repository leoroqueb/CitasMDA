import { Component, OnInit } from '@angular/core';
import { CitaI } from '../models/citas';
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
    this.fetchCitas();
    let citaRes = this.citasService.getCitaList();
    citaRes.snapshotChanges().subscribe(res => {
      this.Citas = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Citas.push(a as CitaI);
      })
    })
  }

  fetchCitas() {
    this.citasService.getCitaList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  deleteCita(id) {
    console.log(id)
    if (window.confirm('Do you really want to delete?')) {
      this.citasService.deleteCita(id)
    }
  }

}
