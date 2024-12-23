import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HammerModule } from '@angular/platform-browser';
import 'hammerjs';
import { GetDataService } from './services/getdata.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot({ mode: 'ios' }), AppRoutingModule, HammerModule,HttpClientModule],
  providers:
    [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      GetDataService
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }
