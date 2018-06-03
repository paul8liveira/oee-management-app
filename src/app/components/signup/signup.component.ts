import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import * as ons from 'onsenui';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'ons-page[signup]',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User();
  loading: boolean = false;

  constructor(private navi: OnsNavigator
            , private userService: UserService) {

  }

  ngOnInit() {
  }

  signup() {
    this.loading = true; 
    this.userService.signup(this.user)
    .subscribe(
      result => {
        ons.notification.alert(`
          Oba! Seu cadastro foi efetuado com sucesso. 
          Agora é só fazer o login com seu usuário e senha para começar a utilizar nosso app!
        `);
        this.push();
        this.user = new User();
      },
      error => {
        ons.notification.toast(error, {timeout: 5000});
        this.loading = false;
      }
    );        
  }

  private push() {
    this.navi.element.pushPage(LoginComponent, {
      animation: "slide", 
      data: { username: this.user.username } 
    });
  }
}
