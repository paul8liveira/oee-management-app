import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import * as ons from 'onsenui';
import { HomeService } from '../../services/home.service';
import { BaseComponent } from '../base.component';
import { Feed } from '../../models/feed';

@Component({
  selector: 'log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent extends BaseComponent implements OnInit {
  @Input() channelId: number;
  @Input() machineCode: string;  
  @Input() date: string;  
  @Input() refreshing: boolean = false;
  @Input() resetLimit: boolean = false;
  
  limit: number = 0;
  feeds: Array<Feed> = [];  

  constructor(private homeService: HomeService) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChange) {
    if(this.date && this.channelId && this.date.length === 10 && this.refreshing) {      
      this.getData(this.resetLimit);
    }
  }

  ngAfterViewInit() {
    
  }

  getData(resetLimit: boolean = false) {  
    this.limit += resetLimit ? -this.limit + 10 : 10;
    
    this.homeService.listFeed(this.getCurrentUser().id, this.channelId, this.machineCode, this.setCurrentDateNoSlash(this.date), this.limit)
    .subscribe(result => {
      this.feeds = result;      
      this.refreshing = false;
    },
    error => {
      ons.notification.alert(error);
    });        
  }  
}