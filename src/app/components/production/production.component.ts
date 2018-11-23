import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import * as ons from 'onsenui';
import { HomeService } from '../../services/home.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'ons-page[production]',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent extends BaseComponent implements OnInit {
  loading: boolean = false;
  channelId: number;
  date: string;
  productionCount: Array<any> = [];
  productionCount1: Array<any> = [];  

  constructor(private homeService: HomeService) {
    super();
    this.channelId = parseInt(localStorage.getItem("filterChannelId"));
    this.date = localStorage.getItem("filterDate");
  }

  ngOnInit() {
    this.refreshProductionCount();
  }

  refreshProductionCount() {    
    this.getProductionCount(1);
    this.getProductionCount(2);
  }

  //ja tenho que refazer toda essa pagina ta td uma bosta...
  getProductionCount(position: number) {
    this.loading = true;
    this.homeService.productionCount(this.formatDateTimeMySQL(this.date, true)
                                    , this.formatDateTimeMySQL(this.date, false)
                                    , this.channelId
                                    , position)
    .subscribe(
      result => {
        if(position === 1)
          this.productionCount = [];
        else
          this.productionCount1 = [];

        //pega colunas para exibir na lista
        let columsArray = [];
        for(let col in result[0]) {
          if(col.indexOf("COL_") > -1)
            columsArray.push({
              code: col,
              name: col.replace("COL_","")
          });
        }

        let totalizador = {
          totalHora : 0,
          mediaTaxa: 0
        };
        //faz calculo totalizador
        for(let i = 0; i < result.length; i++) {                        
          totalizador.totalHora += result[i].total;
          totalizador.mediaTaxa += result[i].taxa;
        }
        totalizador.mediaTaxa = Math.round((totalizador.mediaTaxa / (result.length >= 6 ? result.length-1 : result.length)) * 100) / 100;
        
        if(position === 1) {
          this.productionCount.push(result);          
          this.productionCount.push(totalizador);
          this.productionCount.push(columsArray);
        }
        else {
          this.productionCount1.push(result);          
          this.productionCount1.push(totalizador);
          this.productionCount1.push(columsArray);   
        }
        this.loading = false;
      },
      error => {
        ons.notification.toast(error, {timeout: 5000});
        this.loading = false;
      });     
  }   
}