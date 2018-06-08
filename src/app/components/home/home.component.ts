import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { HomeService } from '../../services/home.service';
import * as ons from 'onsenui';
import { Feed } from '../../models/feed';
import { OnsLazyRepeat, ViewChild, OnsNavigator } from 'ngx-onsenui';
import { FeedComponent } from '../feed/feed.component';


@Component({
  selector: 'ons-page[home]',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {
  loading: boolean = true;
  date: string;
  feeds: Array<Feed> = [];
  hookMessage: string = 'Puxe para baixo para atualizar';
  limit: number = 0;

  constructor(private homeService: HomeService, private _navigator: OnsNavigator) {
    super();
    this.date = this.getCurrentDate();   
    this.getData();
  }

  ngOnInit() {     
  }

  onAction($event) {
    setTimeout(() => {
      $event.done();
      this.getData();
    }, 1000);
  }

  onChangeState($event) {
    switch ($event.state) {
      case 'initial':
        this.hookMessage = 'Puxe para baixo para atualizar';
        break;
      case 'preaction':
        this.hookMessage = 'Solte para atualizar';
        break;
      case 'action':
        this.hookMessage = 'Carregando dados...';
        this.loading = true;
        break;
    }
  }  

  getData() {
    this.limit += 10;
    this.homeService.listFeed(this.getCurrentUser().id, this.setCurrentDateNoSlash(this.date), this.limit)
    .subscribe(
      result => {
        this.feeds = result;
        this.loading = false;
      },
      error => {
        this.loading = false;
        ons.notification.alert(error);        
      });     
  }

  pushFeed() {
    this._navigator.element.pushPage(FeedComponent); 
  }    
}