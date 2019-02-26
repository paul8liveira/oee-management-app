import { Component, OnInit, OnDestroy, Input, SimpleChange } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { HomeService } from '../../../services/home.service';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";
import * as ons from 'onsenui';

@Component({
  selector: 'production-chart',
  templateUrl: './production.chart.component.html',
  styleUrls: ['./production.chart.component.css']
})
export class ProductionChartComponent extends BaseComponent implements OnInit, OnDestroy {
  public charts: Array<AmChart> = new Array<AmChart>();
  @Input() channelId: number;
  @Input() machineCode: string;  
  @Input() date: string;  
  @Input() refreshing: boolean = false;

  gauges: Array<any> = [];
  OEE: Array<any> = [];
  
  constructor(private homeService: HomeService,
              private amChartsService: AmChartsService) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if(this.date && this.channelId && this.date.length === 10 && this.refreshing) {
      this.getData();
    }
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
    cb();
  }

  getOEE(cb) {  
    let dateIni = this.formatDateTimeMySQL(this.date, true);
    let dateFin = this.formatDateTimeMySQL(this.date, false);
    this.homeService.OEE(this.channelId, dateIni, dateFin)
    .subscribe(
      result => {
        this.OEE = []; 
        
        //rejeito result set "ok" do mysql
        for(let i = 0; i < result.length; i++) {
          //vou ter que resolver isso depois na proc, to sem paciencia agora
          if(result[i].length > 1) 
            this.OEE.push(result[i]);
        }
        cb();        
    },
    error => {
      console.log(error); 
    });     
  }  

  getMachineOEE(machine_code: string) {
      //filtra oee conforme maquina selecionada e exibe ao lado do menu (é o que deu por hj...)
      let oee = this.OEE[0].filter(f => {
        return f.machine_code === machine_code;
      });
      if(oee && oee.length > 0) {
        return `OEE: ${oee[0].oee}%`;
      }
  }

  getData() {
    this.destroyCharts(() => {
      this.getOEE(() => {

        this.homeService.chartGauge(this.channelId, null, this.setCurrentDateNoSlash(this.date))
        .subscribe(
          result => {
            this.gauges = result;
    
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
            ons.notification.alert(error);        
          });
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