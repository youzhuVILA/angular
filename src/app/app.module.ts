import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart.store';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HammerModule } from '@angular/platform-browser';
import 'hammerjs';
import { GetDataService } from './services/getdata.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'ios' }),
    AppRoutingModule,
    HammerModule,
    HttpClientModule,
    StoreModule.forRoot({ cart: cartReducer })
  ],
  providers:
    [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      GetDataService
    ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
