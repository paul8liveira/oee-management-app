import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
})
export class BaseComponent implements OnInit {
    ngOnInit() {    
    } 

    getCurrentUser() {
        let currentUser = localStorage.getItem('currentUser');
        return JSON.parse(currentUser); 
    }
    getToken() {
        return localStorage.getItem('token') || null;
    } 

    getCurrentDate() {
        let now = new Date();
        let day = now.getDate();
        let month = now.getMonth()+1;
        let year = now.getFullYear();
        return ((day.toString().length == 1 ? "0"+day : day)
                + "/" + 
                (month.toString().length == 1 ? "0"+month : month) 
                + "/" + 
                year);
    }    

    setCurrentDateNoSlash(date: string) {
        return date.replace("/","").replace("/","").replace("/","");
    }      

    getTime(datetime) {
        let hour = datetime.getHours(); 
        let minute = datetime.getMinutes();
        return (hour.toString().length == 1 ? "0"+hour : hour) 
        + ":" + 
        (minute.toString().length == 1 ? "0"+minute : minute);
    }      
    
    //2018-06-15 08:00:00
    formatDateTimeMySQL(date:string, initial: boolean) {
        let splitDate = date.split("/");
        let day = splitDate[0];
        let month = splitDate[1];
        let year = splitDate[2];
        let hour_ini = localStorage.getItem('filterInitialTurn') + ":00"; 
        let hour_fin = localStorage.getItem('filterFinalTurn') + ":59"; 

        return (
            year 
            + "-" + 
            (month.toString().length == 1 ? "0"+month : month) 
            + "-" + 
            (day.toString().length == 1 ? "0"+day : day)
            + " " + 
            (initial ? hour_ini : hour_fin) 
        );
    }     
}
