import { Injectable } from '@angular/core';
<<<<<<< HEAD

import { CitaI } from '../models/citas'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
=======
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { UsuariosI } from '../models/users.model';

import { CitaI, AforoI } from '../models/citas'
import { AngularFireList, AngularFireObject } from '@angular/fire/database';
>>>>>>> dc82f87... Merge branch 'develop' of https://github.com/leoroqueb/CitasMDA into feature/aforo

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

<<<<<<< HEAD
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
=======
  getAppointments(userDNI: string): Observable<CitaI[]>{
    return this.citasConnection.doc<CitaI[]>(userDNI).valueChanges();
  }

  addAppointment(user: UsuariosI, day: string, schedule: string){
    let appoinmentSus: Subscription;
    let newAppointment: CitaI = {
      dniUsuarioAsociado: user.dni,
      estado: "Pendiente",
      fecha: day,
      hora: schedule,
      lugar: "Planta 5, sector A, puerta 16",
      medicoAsociado: "Dr. Zacarías "
    }
    appoinmentSus = this.getAppointments(user.dni).subscribe(data => {
      let updateAppointments: CitaI[] = [];
      if(data != undefined){
        updateAppointments = data;
      }
      updateAppointments.push(newAppointment);
      this.citasConnection.doc(user.dni).set(newAppointment);
      appoinmentSus.unsubscribe();
    })
  }




  citaListRef: AngularFireList<any>;
  citaRef: AngularFireObject<any>;


  // Update
  updateCita(id, cita: CitaI) {

  }

  // Delete
  deleteCita(id: number) {
    
>>>>>>> dc82f87... Merge branch 'develop' of https://github.com/leoroqueb/CitasMDA into feature/aforo
  }
}
