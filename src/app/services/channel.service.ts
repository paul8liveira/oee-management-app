import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Channel } from '../models/channel';
import { environment } from '../../environments/environment';

@Injectable()
export class ChannelService extends BaseService {
    constructor(private http: Http) {
        super();
    }

    list(userId: number): Observable<Channel[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers}); 

        let url = environment.channelListURL.replace(":userId", userId.toString());
        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }    
}