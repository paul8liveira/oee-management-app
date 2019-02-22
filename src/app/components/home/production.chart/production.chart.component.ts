import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { HomeService } from '../../../services/home.service';
import { AmChartsService, AmChart } from "@amcharts/amcharts3-angular";

@Component({
  selector: 'production-chart',
  templateUrl: './production.chart.component.html',
  styleUrls: ['./production.chart.component.css']
})
export class ProductionChartComponent extends BaseComponent implements OnInit, OnDestroy {
  public chart: AmChart;
  
  constructor(private homeService: HomeService,
              private amChartsService: AmChartsService) {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.chart = this.amChartsService.makeChart("chartProduction", this.makeOptions(
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
      arrows: [ { value: 80 } ],
      bottomText: "667895 unidades",     
    }));
    this.chart = this.amChartsService.makeChart("chartProduction2", this.makeOptions(
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
      arrows: [ { value: 20 } ],
      bottomText: "20000 unidades",      
    }));
  } 

  ngOnDestroy() {
    if (this.chart) {
      this.amChartsService.destroyChart(this.chart);
    }  
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