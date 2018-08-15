import { Component, ViewChild, OnInit } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { OnsSplitterSide, OnsNavigator } from '../../node_modules/ngx-onsenui';
import { environment } from '../environments/environment';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('menu') public menu: OnsSplitterSide;
  @ViewChild('navi') private navi: OnsNavigator;

  login = LoginComponent;
  version = environment.version;
    
  initialPage: any;
  constructor(private authenticationService: AuthenticationService) {    
  }

  ngOnInit(): void {
    this.initialPage = this.authenticationService.isUserLoggedIn() ? HomeComponent : LoginComponent;
  }  

  loadPage(page) {
    this.menu.nativeElement.close();
    this.navi.nativeElement.resetToPage(page, { animation: 'fade' });
  }  

  logout(page) {
    this.authenticationService.logout();
    this.menu.nativeElement.close();
    this.navi.nativeElement.resetToPage(page, { animation: 'fade' });
  }  
}
