import { Component, OnInit } from '@angular/core';
import { OnsNavigator, Params, ViewChild } from 'ngx-onsenui';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'ons-page[login]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _navigator: OnsNavigator) { }

  ngOnInit() {
  }

  pushCadastreSe() {
    this._navigator.element.pushPage(SignupComponent); 
  }
}
