import { Component, OnInit } from '@angular/core';
import { OnsNavigator, Params, ViewChild } from 'ngx-onsenui';
import { SignupComponent } from '../signup/signup.component';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import * as ons from 'onsenui';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'ons-page[login]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  loading = false;

  constructor(
    private userService: UserService,
    private _navigator: OnsNavigator, 
    private params: Params) {
      if(params.data) {
        this.user.username = params.data.username;
      }
  }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.userService.login(this.user)
      .subscribe(result => {
          if (result.success) {
            this.pushHome();
          } 
          else {
            this.loading = false;
            ons.notification.toast(result.message, {timeout: 5000});
          }
      },
      error => {
        ons.notification.toast("Parece que houve um problema com a autenticação, tente daqui a pouco...", {timeout: 5000});
        this.loading = false;
      });    
  }

  pushCadastreSe() {
    this._navigator.element.pushPage(SignupComponent); 
  }
  pushHome() {
    this._navigator.element.pushPage(HomeComponent); 
  }  
}
