import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  initialPage: any;
  constructor(private userService: UserService) {
    this.initialPage = userService.isUserLoggedIn() ? HomeComponent : LoginComponent;
  }
  
}
