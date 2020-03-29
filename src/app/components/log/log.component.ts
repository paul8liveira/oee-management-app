import { Component, Input } from '@angular/core';
import * as ons from 'onsenui';
import { HomeService } from '../../services/home.service';
import { BaseComponent } from '../base.component';
import { Feed } from '../../models/feed';

@Component({
  selector: 'log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent extends BaseComponent {
  refreshing: boolean = true;
  limit: number = 0;
  feeds: Array<Feed> = [];

  constructor(private homeService: HomeService) {
    super();
  }

  getData(channelId: number, machineCode: string, date: string, resetLimit: boolean) {
    this.refreshing = true;
    this.limit += resetLimit ? -this.limit + 10 : 10;

    this.homeService.listFeed(this.getCurrentUser().id, channelId, machineCode, this.setCurrentDateNoSlash(date), this.limit)
      .subscribe(result => {
        this.feeds = result;
        this.refreshing = false;
      },
      error => {
        this.refreshing = false;
        ons.notification.alert(error);
      });
  }
}
