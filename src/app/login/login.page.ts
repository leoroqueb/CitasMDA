import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from '../providers/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login = {
    email: "",
    password: ""
  };
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  registerAnimation(){
    $('.blockwhite').addClass('animationUp');
    $('.blockwhite > p').text('¿A qué esperas?');
    $('#textAnimation').css('display', 'block');
  }

  logInUser(){
    this.authService.loginUser(this.login.email, this.login.password )
    .then(() =>{
      alert("Entro correcto");
      this.router.navigate(['home']);
    })
    .catch(err => console.log(err));
  }

}
