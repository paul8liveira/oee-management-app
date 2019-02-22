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

  constructor(private homeService: HomeService) {
    super();
    this.channelId = parseInt(localStorage.getItem("filterChannelId"));
    this.date = localStorage.getItem("filterDate");
  }

  ngOnInit() {
    this.refreshProductionCount();
  }

  refreshProductionCount() {    
    this.getProductionCount();
  }

  //ja tenho que refazer toda essa pagina ta td uma bosta...
  //agora ja ta um pouco melhor, mas sempre da pra melhorar
  getProductionCount() {  
    this.homeService.productionCount(this.formatDateTimeMySQL(this.date, true)
                                  , this.formatDateTimeMySQL(this.date, false)
                                  , this.channelId)
    .subscribe(
      result => {
        this.productionCount = [];  

        //rejeito result set "ok" do mysql
        let validResultSet = [];
        for(let i = 0; i < result.length; i++) {
          if(result[i].length > 0) 
            validResultSet.push(result[i]);
        }        

        validResultSet.forEach(table => {
          //pega primeira linha para montar dados de colunas
          let first = table[0];
          
          //monta nome das colunas das maquinas
          let columns = [];
          for(let col in first) {
            if(col.indexOf("COL_") > -1)
              columns.push({
                code: col,
                name: col.replace("COL_","")
            });
          }          

          let totalizer = {
            totalHora : 0,
            mediaTaxa: 0
          };

        //faz calculo totalizador
        for(let i = 0; i < table.length; i++) {                        
          totalizer.totalHora += table[i].total;
          totalizer.mediaTaxa += table[i].taxa;
        }
        totalizer.mediaTaxa = Math.round((totalizer.mediaTaxa / (table.length >= 6 ? table.length-1 : table.length)) * 100) / 100;
        totalizer.totalHora = Math.round(totalizer.totalHora * 100) / 100;       

        this.productionCount.push({
          table: table,
          columns: columns,
          totalizer: totalizer
        });
        
      }); 
    },
    error => {
      ons.notification.toast(error, {timeout: 5000});
      this.loading = false;
    });     
  }  
}