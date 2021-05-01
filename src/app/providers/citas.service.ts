import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { AforoI, CitasI, UsuariosI } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private horariosConnection: AngularFirestoreCollection;
  private citasConnection: AngularFirestoreCollection;
  constructor(
    private dbHorarios: AngularFirestore,
    private dbCitas: AngularFirestore,
  ) {
    this.horariosConnection = this.dbHorarios.collection(`horarios`);
    this.citasConnection = this.dbCitas.collection(`citas`);
  }


  /**
   * Función para obtener el aforo máximo de una hora en un día específico. Para usar estos datos,
   * es necesario suscribirse a ellos en el momento en que llames a la función.
   * @param schedule Hora específica a la que quieres ver el aforo
   * @param day Parámetro opcional para ver el aforo concreto de un día. Si no está declarado, busca la hora del día actual.
   * @template  day El formato TIENE que ser DD-MM-YY, donde YY son los últimos dos dígitos del año.
   * @template schedule El formato TIENE que ser HH:MM. 
   * 
   */
  getCapacityInDay(schedule: string, day ?:string): Observable<AforoI>{
    if(day != undefined){
      return this.horariosConnection.doc(day).collection(schedule).doc<AforoI>("aforo"+schedule).valueChanges();
    }else{
      let date = new Date();
      let day = date.getUTCDate();
      //Aumentamos en 1 el mes que nos proporciona el Date (entiendo que angular considera enero como mes 0)
      let month = date.getMonth()+1;
      let year = date.getUTCFullYear();
      //Hacemos substring al year para obtener los últimos dos dígitos del año
      year.toString().substring(2);

      let today:string = "";

      if(month < 10){
        //El método getMonth te lo devuelve como number, para mantener el formato MM hay que añadirle un 0
        today = day + "-" + "0" + month + "-" + year.toString().substring(2);
      }else{
        today = day + "-" + month + "-" + year.toString().substring(2);
      }

      return this.horariosConnection.doc(today).collection(schedule).doc<AforoI>("aforo"+schedule).valueChanges();
    }
  }

  getAppointments(userDNI: string): Observable<CitasI[]>{
    return this.citasConnection.doc<CitasI[]>(userDNI).valueChanges();
  }

  addAppointment(user: UsuariosI, day: string, schedule: string){
    let appoinmentSus: Subscription;
    let newAppointment: CitasI = {
      dniUsuarioAsociado: user.dni,
      estado: "Pendiente",
      fecha: day,
      hora: schedule,
      lugar: "Planta 5, sector A, puerta 16",
      medicoAsociado: "Dr. Zacarías "
    }
    appoinmentSus = this.getAppointments(user.dni).subscribe(data => {
      let updateAppointments: CitasI[] = [];
      if(data != undefined){
        updateAppointments = data;
      }
      updateAppointments.push(newAppointment);
      this.citasConnection.doc(user.dni).set(newAppointment);
      appoinmentSus.unsubscribe();
    })
  }



}
