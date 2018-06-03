import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { Login } from '../models/login';

@Injectable()
export class UserService extends BaseService {
  token: string;
  
  constructor(private http: Http) {
    super();
  }

  isUserLoggedIn() {
    if(localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  signup(user: User): Observable<User> {
      let headers = new Headers({ 'Content-Type': 'application/json' });                
      return this.http.post(environment.userAddURL, 
          JSON.stringify(user), { headers: headers })
          .map(res => res.json())
          .pipe(catchError(this.handleError));            
  }  

  login(user: User): Observable<Login> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
              
      return this.http.post(environment.userAuthenticationURL, 
          JSON.stringify(user), { headers: headers })
          .map(res => {
              let resJson = res.json();
              if(resJson.success) {
                  this.token = resJson.token;
                  localStorage.setItem('currentUser', JSON.stringify(resJson));                    
              }
              return resJson;
          });
  }

  logout(): void {
      this.token = null;
      localStorage.removeItem('currentUser');
  }  
}
