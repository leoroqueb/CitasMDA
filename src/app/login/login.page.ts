import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  registerAnimation(){
    $('.blockwhite').addClass('animationUp');

  }

}
