import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from '../providers/auth.service';

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
    $('body').on( 'click', function(e) {
      if(!$(e.target).hasClass('blockwhite')
        && !$(e.target).parent().hasClass('blockwhite')
        && !$(e.target).parent().parent().hasClass('blockwhite')){
        console.log('heyyy');
        /*$('.blockwhite').css('height', '45%');*/
        $('#textAnimation').css('display', 'none');
        $('.blockwhite').removeClass('animationUp').addClass('animationDown');

      }
      /*console.log('CLICK FUERA');
      $('.blockwhite').removeClass('animationUp').addClass('animationDown');*/
    });
  }

  registerAnimation(){
    $('.blockwhite').removeClass('animationDown').addClass('animationUp');
    $('.blockwhite > p').text('¿A qué esperas?');
    $('#textAnimation').css('display', 'block');
  }

  logInUser(){
    this.authService.loginUser(this.login.email, this.login.password )
    .then(() =>{
      alert('Login correcto');
      this.router.navigate(['home']);
    })
    .catch(err => console.log(err));
  }

}
