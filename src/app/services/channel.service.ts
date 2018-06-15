import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Channel } from '../models/channel';
import { environment } from '../../environments/environment';

@Injectable()
export class ChannelService extends BaseService {
    //token: string;

    constructor(private http: Http) {
        super();
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }

    list(userId: number): Observable<Channel[]> {
        let url = environment.channelListURL.replace(":userId", userId.toString());
        return this.http.get(url)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }    
}