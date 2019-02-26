import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import * as ons from 'onsenui';
import { HomeService } from '../../services/home.service';
import { BaseComponent } from '../base.component';
import { Feed } from '../../models/feed';

@Component({
  selector: 'ons-page[log]',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent extends BaseComponent implements OnInit {
  loadingData: boolean = false;
  limit: number = 0;
  channelId: number;
  machineCode: string;
  date: string;
  feeds: Array<Feed> = [];

  constructor(private homeService: HomeService) {
    super();
    this.channelId = parseInt(localStorage.getItem("filterChannelId"));
    this.machineCode = localStorage.getItem("filterMachineCode");
    this.date = localStorage.getItem("filterDate");
    this.loadingData = true;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getData();
  }

  getData(resetLimit: boolean = false) {  
    this.limit += resetLimit ? -this.limit + 10 : 10;
    this.loadingData = true;

    this.homeService.listFeed(this.getCurrentUser().id, this.channelId, this.machineCode, this.setCurrentDateNoSlash(this.date), this.limit)
    .subscribe(result => {
      this.feeds = result;
      this.loadingData = false;
    },
    error => {
      ons.notification.alert(error);
    });        
  }  
}