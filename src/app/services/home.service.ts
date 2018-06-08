import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { Feed } from '../models/feed';

@Injectable()
export class HomeService extends BaseService {
  token: string;
  
  constructor(private http: Http) {
    super();
  }

    listFeed(userId: number, date: string, limit: number): Observable<Feed[]> {
        let url = environment.feedURL
            .replace(":userId", userId.toString())
            .replace(":date", date)
            .replace(":limit", limit.toString());
            
        return this.http.get(url)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }  
}
