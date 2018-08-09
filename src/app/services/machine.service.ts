import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Machine } from '../models/machine';
import { environment } from '../../environments/environment';

@Injectable()
export class MachineService extends BaseService {
    constructor(private http: Http) {
        super();
    }

    list(userId: number, channelId: number): Observable<Machine[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        let url = environment.machineListURL
            .replace(":userId", userId.toString())
            .replace(":channelId", channelId.toString());
        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }
}