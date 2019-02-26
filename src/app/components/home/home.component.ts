import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { BaseComponent } from '../base.component';
import * as ons from 'onsenui';
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
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {
  channels: Array<any> = [];
  channelId: number;

  machines: Array<any> = [];
  machineCode: string;

  date: string;

  firstLoad: boolean = true;
  refreshing: boolean = false;
  interval: any;
  
  hookMessage: string = 'Puxe para baixo para atualizar';
  
  constructor(private _navigator: OnsNavigator,
              private channelService: ChannelService,
              private machineService: MachineService,
              private inj: Injector) {
    super();
  }

  ngOnInit() {
    this.date = this.getCurrentDate();    
    this.getChannels();

    //faço isso pra limpar a variavel de refresh, ja serve por enquanto
    this.interval = setInterval(() => {
      this.refreshing = false;
    }, 3000);    
  }

  ngAfterViewInit() {
  } 

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  onAction($event) {
    setTimeout(() => {
      $event.done();
      this.setFilters(true);
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
        this.setFilters(true);
        break;
    }
  }  

  setFilters(refreshing: boolean = false) {
    this.refreshing = refreshing;
    localStorage.setItem('filterChannelId', this.channelId.toString());
    localStorage.setItem('filterMachineCode', this.machineCode);
    localStorage.setItem('filterDate', this.date);   
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
        ons.notification.toast(error || "Falha ao carregar lista de canais", {timeout: 5000});
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
        
        //faço assim pra garantir o primeiro load e depois não efetuar mais
        if(this.firstLoad) {
          this.setFilters(true);
          this.firstLoad = false;
        }
           
      },
      error => {
        ons.notification.toast(error, {timeout: 5000});
      });     
  }  

  scrollUp() {
    var pageContent = document.getElementById("homePage");
    pageContent.scrollTop = 0;
  }
}