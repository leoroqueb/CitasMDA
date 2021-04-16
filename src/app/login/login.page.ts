import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login = {};
  constructor() { }

  ngOnInit() {

  }

  registerAnimation(){
    $('.blockwhite').addClass('animationUp');
    $('.blockwhite > p').text('¡Es hora de tener una cuenta!');
    $('#textAnimation').css('display', 'block');
  }

  onSubmit(){
    console.log(this.login);
  }

}
