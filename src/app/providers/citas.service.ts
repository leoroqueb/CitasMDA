import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { UsuariosI } from '../models/users.model';
import { CitaI, AforoI, CitasArrayI } from '../models/citas.model'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Refactor } from '../refactor/refactor.service';


declare let Email: any;

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  //Conexiones a la BD
  private horariosConnection: AngularFirestoreCollection;
  private citasConnection: AngularFirestoreCollection;

  //Suscripciones a los documentos de la BD
  private appoinmentSus: Subscription;
  private capacitySus: Subscription;
  private editingSus: Subscription;

  //Variables internas para crear las citas
  private sector: string[] = ['A', 'B', 'C', 'D', 'E'];
  private doctorsArray: string[] = [
    'Dr. Zacarías Atrustegui',
    'Dr. Ethan Hunter',
    'Dr. Peter Parker',
    'Dr. John McClane',
    'Dr. Nathan Drake',
    'Dr. Kratos Spartanghost',
    'Dra. Natasha Romanoff'
  ];

  //Va a editar la cita?
  public editing:boolean = false;
  public appointmentToEdit:CitaI = undefined;
  
  constructor(
    private dbHorarios: AngularFirestore,
    private dbCitas: AngularFirestore,
    private alertController: AlertController,
    private router: Router,
    private refactor: Refactor
  ) {
    this.horariosConnection = this.dbHorarios.collection(`horarios`);
    this.citasConnection = this.dbCitas.collection(`citas`);
    
  }

  registerUserToAppointmentsBD(dni: string){
    let appointmentArray: CitasArrayI = {
      pendientes: [],
      modificadas: [],
      finalizadas: []
    }
    this.citasConnection.doc(dni).set(appointmentArray);
  }

  editAppointment(newDay:string, newSchedule: string){
    //Si hay algo que editar
    if(this.editing && this.appointmentToEdit != undefined){
      //Comprobamos aforo de la fecha nueva
      this.editingSus = this.getCapacityInDay(newSchedule, newDay).subscribe(capacity => {
        if (capacity.actual < capacity.maximo){
          //Le pedimos confirmación
          this.confirmAppointment(newDay, newSchedule)
          .then(confirmed => {
            if(confirmed){
              //Eliminamos la cita de su estado pendiente
              this.deleteAppointment(this.appointmentToEdit).then(() => {
                //cambiamos de la cita los datos necesarios
                this.appointmentToEdit.estado = "Modificada";
                this.appointmentToEdit.fecha = newDay;
                this.appointmentToEdit.hora = newSchedule;
                //Actualizamos la cita
                let updateAppointmentSus = this.citasConnection.doc<CitasArrayI>(this.appointmentToEdit.dniUsuarioAsociado).valueChanges().subscribe(data =>{
                  data.modificadas.push(this.appointmentToEdit);
                  this.citasConnection.doc(this.appointmentToEdit.dniUsuarioAsociado).update(data).then(() => {
                    this.refactor.presentToast("Su cita se ha modificado correctamente.");
                    //Actualizamos el aforo de la nueva cita
                    this.updateActualCapacityInDay(this.appointmentToEdit.fecha, this.appointmentToEdit.hora, true);
                    //Reseteamos los valores por defecto
                    this.editing = false;
                    this.appointmentToEdit = undefined;
                    //Cerramos conexiones y vamos al home
                    this.editingSus.unsubscribe();
                    this.router.navigateByUrl('/home');
                  });
                  updateAppointmentSus.unsubscribe();
                })
              });
            }else{
              this.refactor.presentToast("Su cita no se ha modificado.");
              //Reseteamos los valores por defecto
              this.editing = false;
              this.appointmentToEdit = undefined;
              //Cerramos conexiones y vamos al home
              this.editingSus.unsubscribe();
              this.router.navigateByUrl('/home');
            }
          });
        }else{
          this.refactor.presentToast("Lo sentimos, el aforo actual para esta hora está completo.");
        }
      })
      
    }else{
      this.refactor.presentToast("Ha ocurrido un error, inténtelo de nuevo más tarde.");
      this.router.navigateByUrl('/home');
    }
  }

  deleteAppointment(appointment:CitaI): Promise<void>{
    return new Promise((resolve) => {
      let deleteSus = this.citasConnection.doc<CitasArrayI>(appointment.dniUsuarioAsociado).valueChanges().subscribe(data =>{
        let index: number;
        switch(appointment.estado){
          case "Pendiente": {
            //Antes de eliminar la cita, decrementamos el aforo de la hora antes de ser modificada.
            this.updateActualCapacityInDay(this.appointmentToEdit.fecha, this.appointmentToEdit.hora,false);
            //Cogemos la cita y la eliminamos
            index = data.pendientes.indexOf(appointment);
            data.pendientes.splice(index,1);
            //Actualizamos la BD
            this.citasConnection.doc(appointment.dniUsuarioAsociado).set(data);
            //Eliminamos conexiones
            deleteSus.unsubscribe();
            resolve();
            break;
          }
          case "Modificada":{
            //Antes de eliminar la cita, decrementamos el aforo de la hora antes de ser modificada.
            this.updateActualCapacityInDay(this.appointmentToEdit.fecha, this.appointmentToEdit.hora,false);
            //Cogemos la cita y la eliminamos
            index = data.modificadas.indexOf(appointment);
            data.modificadas.splice(index,1);
            //Actualizamos la BD
            this.citasConnection.doc(appointment.dniUsuarioAsociado).set(data);
            //Eliminamos conexiones
            deleteSus.unsubscribe();
            resolve();
            break;
          }
          case "Finalizada": {
            //Antes de eliminar la cita, decrementamos el aforo de la hora antes de ser modificada.
            this.updateActualCapacityInDay(this.appointmentToEdit.fecha, this.appointmentToEdit.hora,false);
            //Cogemos la cita y la eliminamos
            index = data.finalizadas.indexOf(appointment);
            data.finalizadas.splice(index,1);
            //Actualizamos la BD
            this.citasConnection.doc(appointment.dniUsuarioAsociado).set(data);
            //Eliminamos conexiones
            deleteSus.unsubscribe();
            resolve();
            break;
          }
        }
      })
    })
    
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
  
  checkCapacityAvailableAndAddAppointment(day: string, schedule: string, user: UsuariosI): void{
    let newAppointment: CitaI;
    this.capacitySus = this.getCapacityInDay(schedule, day).subscribe(capacity => {
      if(capacity.actual < capacity.maximo){
        this.confirmAppointment(day, schedule).then(confirmed =>{
          if(confirmed){
            newAppointment = this.addAppointment(user, day, schedule); 
            this.sendConfirmationEMail(user, newAppointment);
            this.router.navigateByUrl('/home');
            
          }else{
            this.capacitySus.unsubscribe();
            //La cita no se registra y te manda de vuelta al home
            this.refactor.presentToast("Su cita no ha sido registrada.");
            this.router.navigateByUrl('/home');
          }
        }).catch(err => {
          console.log("YA ROMPISTE ESTA MIERDA PARGUELA");
          console.log(err);
          this.capacitySus.unsubscribe();
        });
      }else{
        this.refactor.presentToast("Lo sentimos, el aforo actual para esta hora está completo.")
        this.capacitySus.unsubscribe();
      }
    })
  }

  confirmAppointment(day: string, schedule: string): Promise<boolean>{
    return new Promise(async (resolve) => {
      
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Revisa los datos de tu cita',
          message: '<b>Fecha:</b><br>'+ day +'<br>'
          + '<b>Hora:</b><br>' + schedule,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'danger',
              handler: () => {
                resolve(false);
                console.log('La cita no se crea');
              }
            }, {
              text: 'Confirmar la cita',
              handler: () => {
                resolve(true);
              }
            }
          ]
        });
    
        await alert.present();
      }

    )
  }
  
  sendConfirmationEMail(user: UsuariosI, appointment: CitaI){
    Email.send({
      Host : 'smtp.mailtrap.io',
      Username : '173b79df9af293',
      Password : '3740a47b81424f',
      To : user.email,
      From : 'f6a735e606-f91dda@inbox.mailtrap.io',
      Subject : 'Detalles de tu cita.',
      Body :
      '<h1>Gracias por confiar en Hospital San Roque.</h1> <br/> '+
      '<h2>Estos son los detalles de tu cita:</h2><br>'+
      '<b>Fecha:</b><br>'+
      appointment.fecha + '<br>' +
      '<b>Hora:</b><br>' +
      appointment.hora + '<br>' +
      '<b>Lugar: </b><br>' +
      appointment.lugar + '<br>' +
      '<b>Le atenderá: </b> <br>' +
      appointment.medicoAsociado + 
      '<br><h3>En caso de que no pueda asistir a su cita, por favor avísenos con antelación. Le recordamos que a través de la app puede modificar o eliminar su cita.<h3>'
      }).then( () => {
        this.refactor.presentToast("Le ha sido enviado un correo de confirmación a su email de contacto.")
      });
  }


  getAppointments(userDNI: string): Observable<CitasArrayI>{
    return this.citasConnection.doc<CitasArrayI>(userDNI).valueChanges();
  }

  
  addAppointment(user: UsuariosI, day: string, schedule: string): CitaI{
    //Creamos la cita con los datos recogidos
    let newAppointment: CitaI = {
      dniUsuarioAsociado: user.dni,
      estado: "Pendiente",
      fecha: day,
      hora: schedule,
      lugar: 
      //Le damos un poco de aleatoriedad por aquí
      'Planta ' + Math.round(Math.random() * (8 - 1) + 1) + 
      ', Sector ' + this.sector[Math.round(Math.random() * (this.sector.length-1 - 0) + 0)] + 
      ', Puerta ' + Math.round(Math.random() * (20 - 1) + 1),
      medicoAsociado: this.doctorsArray[Math.round(Math.random() * (this.doctorsArray.length-1 - 0) + 0)]
    }

    //Cogemos las citas existentes de la BD y actualizamos las pendientes para añadir la cita
    this.appoinmentSus = this.getAppointments(user.dni).subscribe(data => {
      data.pendientes.push(newAppointment);
      //Actualizamos la DB
      this.citasConnection.doc(user.dni).set(data);

      //Cerramos conexiones
      this.appoinmentSus.unsubscribe();
    })

    /**
     * Actualizamos el aforo
     * No es la manera más correcta (debería actualizarse una vez se añade la cita, no paralelamente), pero es la que no da errores. 
     */
    this.updateActualCapacityInDay(day, schedule, true);

    //Devolvemos la cita creada, que servirá para enviar el correo de confirmación
    return newAppointment;
  }

  updateActualCapacityInDay(day: string, schedule: string, addOrSustract: boolean){
    let updateCapacitySus: Subscription;
    //Cogemos el aforo actual en el horario en que se ha confirmado la cita
    updateCapacitySus = this.getCapacityInDay(schedule, day).subscribe(capacity => {
      //Si addOrSustract es true, incrementamos el aforo, si no, lo decrementamos.
      if(addOrSustract){
        capacity.actual++;
      }else{
        capacity.actual--;
      }
      this.horariosConnection.doc(day).collection(schedule).doc<AforoI>("aforo"+schedule).set(capacity);
      //Cerramos conexiones
      updateCapacitySus.unsubscribe();
    })
  }

}
