import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../providers/auth.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})

export class RegistrationPage implements OnInit {

  constructor(
    public router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(){}
  
  signUp(email, password){
    this.authService.registerUser(email.value,password.value);
  }

}