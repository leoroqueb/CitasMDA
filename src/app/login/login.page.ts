import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from '../providers/auth.service';
import { Refactor } from '../refactor/refactor.service';


/*import nodemailer from 'nodemailer';
import { getMaxListeners } from 'node:process';*/

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  open = false;
  login = {
    email: '',
    password: ''
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private refactor: Refactor,
  ) { }

  ngOnInit() {
      $('body').on('click', (e) => {
        if (!$(e.target).hasClass('blockwhite')
          && !$(e.target).parent().hasClass('blockwhite')
          && !$(e.target).parent().parent().hasClass('blockwhite')
          && this.open) {

          $('.blockwhite').removeClass('animationUp').addClass('animationDown');
          $('.text > p').text('¿No tienes cuenta todavía?');
          $('.textEffect').addClass('ion-hide');

        }

      });

    }

  registerAnimation(){
    $('.blockwhite').removeClass('animationDown').addClass('animationUp');
    $('.text > p').text('¿A qué esperas?');
    $('.textEffect').removeClass('ion-hide');
    this.open = true;
  }

  closeAnimation(){
    $('#textAnimation').css('display', 'none');
    $('.blockwhite').removeClass('animationUp').addClass('animationDown');
  }

  logInUser(){
    this.authService.loginUser(this.login.email, this.login.password )
    .then(() =>{
      //Si el logueo es correcto, y el usuario que ha entrado es el admin, se le redirige a su página
      this.refactor.presentToast('¡Bienvenido/a de nuevo!');
      if(this.login.email == "admin@hospital.com"){
        this.router.navigateByUrl('home-admin');
      }else{
        this.router.navigateByUrl('home');
      }
    })
    .catch(err => {
      console.log(err);
      this.refactor.presentToast("Los datos introducidos no son correctos");
    });
  }

}
