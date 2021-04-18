import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { CitasService } from '../citas.service';

@Component({
  selector: 'app-add-cita',
  templateUrl: './add-cita.page.html',
  styleUrls: ['./add-cita.page.scss'],
})
export class AddCitaPage implements OnInit {

  citaForm: FormGroup;

  constructor(
    private citasService: CitasService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.citaForm = this.fb.group({
      dni_usuario: [''],
      estado: [''],
      fecha: ['2021-10-01'],
      hora: ['09:20'],
      medico: [''],
      lugar: ['']
    })
  }

  formSubmit() {
    if (!this.citaForm.valid) {
      return false;
    } else {
        // console.log(this.citaForm.value)
        // this.citaForm.reset();
        // this.router.navigate(['/citas']);
      this.citasService.createCita(this.citaForm.value).then(res => {
        console.log(res)
        this.citaForm.reset();
        this.router.navigate(['/citas']);
      })
        .catch(error => console.log(error));
    }
  }

}
