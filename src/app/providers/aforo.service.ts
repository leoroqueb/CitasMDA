import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AforoI } from '../models/citas.model';
import { Refactor } from '../refactor/refactor.service';

@Injectable({
  providedIn: 'root'
})
export class AforoService {
  horariosConnection: AngularFirestoreCollection;
  constructor(
    private db: AngularFirestore,
    private refactor: Refactor
  ) {
    this.horariosConnection = this.db.collection(`horarios`);
  }

   /**
   * Función para obtener el aforo máximo de una hora en un día específico. Para usar estos datos,
   * es necesario suscribirse a ellos en el momento en que llames a la función.
   * @param schedule Hora específica a la que quieres ver el aforo
   * @param day Parámetro opcional para ver el aforo concreto de un día. Si no está declarado, busca la hora del día actual.
   * @template  day El formato TIENE que ser DD-MM-YYYY
   * @template schedule El formato TIENE que ser HH:MM. 
   * 
   */
    getCapacityOnDayAndSchedule(schedule: string, day ?:string): Observable<AforoI>{
      if(day != undefined){
        return this.horariosConnection.doc(day).collection(schedule).doc<AforoI>("aforo"+schedule).valueChanges();
      }else{
        let date = new Date();
        let day = date.getUTCDate();
        //Aumentamos en 1 el mes que nos proporciona el Date (entiendo que angular considera enero como mes 0)
        let month = date.getMonth()+1;
        let year = date.getUTCFullYear();
  
        let today:string = "";
  
        if(month < 10){
          //El método getMonth te lo devuelve como number, para mantener el formato MM hay que añadirle un 0
          today = day + "-" + "0" + month + "-" + year.toString();
        }else{
          today = day + "-" + month + "-" + year.toString();
        }
  
        return this.horariosConnection.doc(today).collection(schedule).doc<AforoI>("aforo"+schedule).valueChanges();
      }
    }

    addNewCapacity(day: string, schedule: string, newCapacity: number): Promise<void>{

      let capacity: AforoI = {
        actual: 0,
        maximo: newCapacity
      }

      let reformatedDay: string = "";
      let reformatedSchedule: string = "";
      
      //Debido a que los datos del datepicker vienen en formato UTC, hay que hacerles un reformat para que coincidan con la BD
      //En caso de que alguno de los métodos devuelva null, significa que el dia ya está formateado
      if((reformatedDay = this.refactor.dayReformat(day)) == null){
        reformatedDay = day;
      }
      if((reformatedSchedule = this.refactor.scheduleReformat(schedule)) == null){
        reformatedSchedule = schedule;
      }
      return this.horariosConnection.doc(reformatedDay).collection(reformatedSchedule).doc("aforo"+reformatedSchedule).set(capacity);
    }
}
