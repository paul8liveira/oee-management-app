import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../base.component';
import { HomeService } from '../../services/home.service';
import * as ons from 'onsenui';
import { Feed } from '../../models/feed';
import { OnsNavigator } from 'ngx-onsenui';
import { FeedComponent } from '../feed/feed.component';
import { ChannelService } from '../../services/channel.service';
import { MachineService } from '../../services/machine.service';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'ons-page[home]',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {
  channels: Array<any> = [];
  channelId: number;

  machines: Array<any> = [];
  machineCode: string;

  loading: boolean = false;
  date: string;
  
  feeds: Array<Feed> = [];
  hookMessage: string = 'Puxe para baixo para atualizar';
  limit: number = 0;

  firstLoad: boolean = true;

  constructor(private homeService: HomeService, 
              private _navigator: OnsNavigator,
              private channelService: ChannelService,
              private machineService: MachineService,
              private inj: Injector) {
    super();
  }

  ngOnInit() {
    this.date = this.getCurrentDate();
    this.getChannels();
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

  getData(resetLimit: boolean = false) {
    this.limit += resetLimit ? -this.limit+10 : 10;
    this.loading = true;

    this.homeService.listFeed(this.getCurrentUser().id, this.channelId, this.machineCode, this.setCurrentDateNoSlash(this.date), this.limit)
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

  openMenu() {
    this.inj.get(AppComponent).menu.nativeElement.open();
  }  

  pushFeed() {
    this._navigator.element.pushPage(FeedComponent); 
  }    

  getChannels() {
    this.channelService.list(this.getCurrentUser().id)
    .subscribe(
      result => {
        this.channels = result.filter(f => f.active.toString() === "Ativo");
        this.channelId = this.channels[0].id;
        this.getMachines();
      },
      error => {
        ons.notification.toast(error, {timeout: 5000});
      });     
  }  
  onSelectChannel(channelId: number) {
    this.channelId = channelId;
    this.getMachines();
  }
  
  getMachines() {
    this.machineService.list(this.getCurrentUser().id, this.channelId)
    .subscribe(
      result => {
        this.machines = result;
        this.machineCode = this.machines[0].code;      
        
        if(this.firstLoad) {
          this.getData();
          this.firstLoad = false;
        }
          
      },
      error => {
        ons.notification.toast(error, {timeout: 5000});
      });     
  }  

}