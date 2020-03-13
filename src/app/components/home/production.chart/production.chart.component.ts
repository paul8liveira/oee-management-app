import { Component, OnInit, OnDestroy, Input, SimpleChange } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { HomeService } from '../../../services/home.service';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import * as ons from 'onsenui';

@Component({
  selector: 'ons-page[production-chart]',
  templateUrl: './production.chart.component.html',
  styleUrls: ['./production.chart.component.css']
})
export class ProductionChartComponent extends BaseComponent implements OnInit, OnDestroy {
  public charts: Array<AmChart> = new Array<AmChart>();
  public refreshing: boolean = false;
  public channelId: number;
  public machineCode: string;
  public date: string;

  gauges: Array<any> = [];
  OEE: Array<any> = [];
  
  constructor(private homeService: HomeService,
              private amChartsService: AmChartsService) {
    super();
    this.channelId = parseInt(localStorage.getItem("filterChannelId"));
    this.machineCode = localStorage.getItem("filterMachineCode");
    this.date = localStorage.getItem("filterDate");
    this.refreshing = true;    
  }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    
  } 

  ngOnDestroy() {
    this.destroyCharts(null);
  }  
  destroyCharts(cb) {    
    if (this.charts) {
      this.charts.forEach(f => this.amChartsService.destroyChart(f));
    }
    this.charts = [];  
    if(cb !== null) cb();
  }

  getData() {
    this.refreshing = true;
    this.destroyCharts(() => {
      let dateIni = this.formatDateTimeMySQL(this.date, true);
      let dateFin = this.formatDateTimeMySQL(this.date, false);
      let date = this.setCurrentDateNoSlash(this.date);

      this.homeService.chartGauge(this.channelId, null, date, dateIni, dateFin)
      .subscribe(
        result => {
          //rejeito result set "ok" do mysql (não pego o item 0 de result pq ele é o gauge)
          let oeeResultSet = [];
          for(let i = 1; i < result.length; i++) {
            if(result[i].length > 0) 
              oeeResultSet.push(result[i]);
          }
        
          //iteração sobre os gauges para adicionar o oee
          let gauges = result[0];
          for(let i = 0; i < gauges.length; i++) {
            let gauge = gauges[i];
            gauge["oee"] = oeeResultSet[0] ? oeeResultSet[0].filter(f => f.machine_code == gauge.machine_code) : [];
          }
          this.gauges = gauges;
  
          for(let i = 0; i < this.gauges.length; i++) {
            let chart = this.amChartsService.makeChart(`chartProduction_${i}`, this.makeOptions(
              { bands: [ 
                {
                  "color": "#cc4748",
                  "endValue": 33,
                  "startValue": 0
                }, 
                {
                  "color": "#fdd400",
                  "endValue": 66,
                  "startValue": 33
                }, 
                {
                  "color": "#84b761",
                  "endValue": 100,
                  "innerRadius": "95%",
                  "startValue": 66
                } 
              ],
              endValue: 100,
              arrows: [ { value: this.gauges[i].production } ],
              bottomText: this.gauges[i].chart_tooltip_desc,     
            }), 500);
            this.charts.push(chart);            
          }        
          this.refreshing = false;
        },
        error => {
          if(error !== 'sem dados')
            ons.notification.alert(error);        
        });
    

    });
  }

  makeOptions(data) {
    return {
      "type": "gauge",
      "theme": "none",   
      "axes": [ 
        {
          "unit": "%",
          "axisThickness": 1,
          "axisAlpha": 0.2,
          "tickAlpha": 0.2,
          "valueInterval": 10,
          "bands": data.bands,
          "bottomText": data.bottomText,
          "bottomTextYOffset": 10,
          "endValue": data.endValue
        } 
      ],
      "arrows": data.arrows,
      "export": {
        "enabled": false
      }
    };
  }  
}