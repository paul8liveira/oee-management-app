import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { HomeService } from '../../services/home.service';
import * as ons from 'onsenui';
import { Feed } from '../../models/feed';
import { OnsLazyRepeat, ViewChild } from 'ngx-onsenui';


@Component({
  selector: 'ons-page[home]',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {
  loading: boolean = false;
  date: string;
  feeds: Array<Feed> = [];
  hookMessage: string = 'Puxe para baixo para atualizar';
  limit: number = 0;

  constructor(private homeService: HomeService) {
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
        break;
    }
  }  

  getData() {
    this.limit += 10;
    this.homeService.listFeed(this.getCurrentUser().id, this.getCurrentDateNoSlash(), this.limit)
    .subscribe(
      result => {
        this.feeds = result;
      },
      error => {
        ons.notification.alert(error);        
      });     
  }
}