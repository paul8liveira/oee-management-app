import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { HttpModule } from '@angular/http';
import { OnsenModule } from 'ngx-onsenui';
import {NgxMaskModule} from 'ngx-mask'
import { AmChartsModule } from "@amcharts/amcharts3-angular";

import { Routing } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserService } from './services/user.service';
import { HomeService } from './services/home.service';
import { BaseComponent } from './components/base.component';
import { FeedComponent } from './components/feed/feed.component';
import { ChannelService } from './services/channel.service';
import { MachineService } from './services/machine.service';
import { AuthenticationService } from './services/authentication.service';
import { ProductionComponent } from './components/production/production.component';
import { ProductionChartComponent } from './components/home/production.chart/production.chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    FeedComponent,
    ProductionComponent,
    ProductionChartComponent
  ],
  entryComponents: [
    LoginComponent,
    SignupComponent, 
    HomeComponent, 
    FeedComponent,
    ProductionComponent,
    ProductionChartComponent
  ],
  imports: [
    Routing,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    CommonModule,
    FormsModule,
    OnsenModule,
    NgxMaskModule.forRoot(),
    AmChartsModule
  ],
  providers: [
    UserService,
    AuthenticationService,
    HomeService,
    ChannelService,
    MachineService
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }
