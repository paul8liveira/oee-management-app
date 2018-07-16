import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { HomeComponent } from './components/home/home.component';
import { OnsSplitterSide, OnsNavigator } from '../../node_modules/ngx-onsenui';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('menu') public menu: OnsSplitterSide;
  @ViewChild('navi') private navi: OnsNavigator;

  login = LoginComponent;
  version = environment.version;
  
  initialPage: any;
  constructor(private userService: UserService) {
    this.initialPage = userService.isUserLoggedIn() ? HomeComponent : LoginComponent;
  }

  loadPage(page) {
    this.menu.nativeElement.close();
    this.navi.nativeElement.resetToPage(page, { animation: 'fade' });
  }  

  logout(page) {
    this.userService.logout();
    this.menu.nativeElement.close();
    this.navi.nativeElement.resetToPage(page, { animation: 'fade' });
  }    
}
