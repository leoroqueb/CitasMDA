import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import { Refactor } from '../refactor/refactor.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  public register = false;
  public forms = {
    form1: true,
    form2: false,
    form3: false
  };
  campos = {
    email: '',
    password: '',
    genero: '',
    direccion: '',
    telefono: '',
    dni: '',
    ss: ''
  };
  constructor(
    private router: Router,
    private refactor: Refactor,
    private authService: AuthService,
  ) { }

  ngOnInit(){}

  signUp(){
    console.log(this.campos);
    //this.authService.registerUser(email.value, password.value);
  }

  next(){

    // Del 2 al 3
    if(this.forms.form2 === true){
      this.forms.form2 = false;
      this.forms.form3 = true;
      $('#progressbar').val('1');
      $('#subtitle').text('Y ya hemos terminado');
      this.register = true;
    }

    // Del 1 al 2
    if(this.forms.form1 === true){
      this.forms.form1 = false;
      this.forms.form2 = true;
      $('#progressbar').val('0.5');
      $('#subtitle').text('Un poco más...');
    }
  }
}
