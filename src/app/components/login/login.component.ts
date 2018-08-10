import { Component, OnInit } from '@angular/core';
import { OnsNavigator, Params, ViewChild } from 'ngx-onsenui';
import { SignupComponent } from '../signup/signup.component';
import { User } from '../../models/user';
import * as ons from 'onsenui';
import { HomeComponent } from '../home/home.component';
import { AuthenticationService } from '../../services/authentication.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'ons-page[login]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {
  user: User = new User();
  loading = false;

  constructor(
    private authenticationService: AuthenticationService,
    private _navigator: OnsNavigator, 
    private params: Params) {
      super();
      if(params.data) {
        this.user.username = params.data.username;
      }
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.user)
        .subscribe(loginResult => {
            if (loginResult.success) {
              this.authenticationService.getUserDataByToken(this.getToken())
              .subscribe(userData => {
                this.pushHome();
              },
              error => {
                ons.notification.toast("Parece que houve um problema com a autenticação, tente daqui a pouco...", {timeout: 5000});
                this.loading = false;
              });
            }
            else {
              this.loading = false;
              ons.notification.toast(loginResult.message, {timeout: 5000});
            }
        },
        error => {
          ons.notification.toast("Parece que houve um problema com a autenticação, tente daqui a pouco...", {timeout: 5000});
          this.loading = false;
        }); 
  }

  pushSignUp() {
    this._navigator.element.pushPage(SignupComponent); 
  }
  pushHome() {
    this._navigator.element.pushPage(HomeComponent); 
  }  
}
