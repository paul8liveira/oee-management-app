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

  signup(user: User): Observable<User> {
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'x-access-token': this.getToken()
    });                
    return this.http.post(environment.userAddURL, 
        JSON.stringify(user), { headers: headers })
        .map(res => res.json())
        .pipe(catchError(this.handleError));            
  }  
}
