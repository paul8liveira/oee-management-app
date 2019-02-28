import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { catchError } from 'rxjs/operators';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { environment } from '../../environments/environment';
import { Feed } from '../models/feed';

@Injectable()
export class HomeService extends BaseService {  
  constructor(private http: Http) {
    super();
  }

    listFeed(userId: number, channelId: number, machineCode: string, date: string, limit: number): Observable<Feed[]> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});        
        
        let url = environment.feedURL
            .replace(":userId", userId.toString())
            .replace(":channelId", channelId.toString())
            .replace(":machineCode", machineCode)
            .replace(":date", date)
            .replace(":limit", limit.toString());
            
        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }  

    productionCount(dateIni: string, dateFin: string, channelId: number): Observable<any> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});

        let params = `${environment.productionURL}?dateIni=${dateIni}&dateFin=${dateFin}&ch_id=${channelId.toString()}`;
        return this.http.get(params, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }

    chartGauge(channelId: number, machineCode: string, date: string, dateIni: string, dateFin: string): Observable<any> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let options = new RequestOptions({headers: headers});        
        
        let url = environment.chartGaugeURL
            .replace(":channelId", channelId.toString())
            .replace(":machineCode", machineCode)
            .replace(":date", date)
            .replace(":ini", dateIni)
            .replace(":fin", dateFin);
            
        return this.http.get(url, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    } 
    
    OEE(channelId: number, dateIni: string, dateFin: string): Observable<any> {
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'x-access-token': this.getToken()
        });
        let params = {
            ch_id: channelId,
            dateIni: dateIni,
            dateFin: dateFin
        };
        let options = new RequestOptions({
            headers: headers, 
            search: params
        });

        return this.http.get(environment.OeeURL, options)
            .map(res => res.json())
            .pipe(catchError(this.handleError));
    }      
}
