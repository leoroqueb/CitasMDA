import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { UsuariosI } from '../models/users.model';

import { CitaI, AforoI } from '../models/citas'
import { AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  citaListRef: AngularFireList<any>;
  citaRef: AngularFireObject<any>;

  citasConnection: AngularFirestoreCollection;

  constructor() { }


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

  // Update
  updateCita(id, cita: CitaI) {

  }

  // Delete
  deleteCita(id: number) {
    
  }
}
