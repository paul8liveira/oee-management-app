import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { Machine } from '../models/machine';
import { environment } from '../../environments/environment';

@Injectable()
export class MachineService extends BaseService {
    //token: string;

    constructor(private http: Http) {
        super();
        // var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // this.token = currentUser && currentUser.token;
    }

    list(userId: number, channelId: number): Observable<Machine[]> {
        let url = environment.machineListURL
            .replace(":userId", userId.toString())
            .replace(":channelId", channelId.toString());
        return this.http.get(url)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }
}