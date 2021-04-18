import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { CitasService } from '../citas.service';

@Component({
  selector: 'app-edit-cita',
  templateUrl: './edit-cita.page.html',
  styleUrls: ['./edit-cita.page.scss'],
})
export class EditCitaPage implements OnInit {

  updateCitaForm: FormGroup;
  id: any;

  constructor(
    private citasService: CitasService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.citasService.getCita(this.id).valueChanges().subscribe(res => {
      this.updateCitaForm.setValue(res);
    });
  }

  ngOnInit() {
    this.updateCitaForm = this.fb.group({
      dni_usuario: [''],
      estado: [''],
      fecha: [''],
      hora: [''],
      medico: [''],
      lugar: ['']
    })
    console.log(this.updateCitaForm.value)
  }

  updateForm() {
    this.citasService.updateCita(this.id, this.updateCitaForm.value)
      .then(() => {
        this.router.navigate(['/citas']);
      })
      .catch(error => console.log(error));
  }

}
