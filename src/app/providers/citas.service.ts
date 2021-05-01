import { Injectable } from '@angular/core';

import { CitaI } from '../models/citas'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  citaListRef: AngularFireList<any>;
  citaRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createCita(cita: CitaI) {
    this.citaListRef = this.db.list('/cita');
    return this.citaListRef.push({
      dni_usuario: cita.dni_usuario,
      estado: cita.estado,
      fecha: cita.fecha,
      hora: cita.hora,
      medico: cita.medico,
      lugar: cita.lugar
    })
  }

  // Get Single
  getCita(id: number) {
    this.citaRef = this.db.object('/cita/' + id);
    return this.citaRef;
  }

  // Get List
  getCitaList() {
    this.citaListRef = this.db.list('/cita');
    return this.citaListRef;
  }

  // Update
  updateCita(id, cita: CitaI) {
    return this.citaRef.update({
      dni_usuario: cita.dni_usuario,
      estado: cita.estado,
      fecha: cita.fecha,
      hora: cita.hora,
      medico: cita.medico,
      lugar: cita.lugar
    })
  }

  // Delete
  deleteCita(id: number) {
    this.citaRef = this.db.object('/cita/' + id);
    this.citaRef.remove();
  }
}
