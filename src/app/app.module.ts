import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentServiceService } from './component-service.service';
import { HeremapService } from './heremap.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { StorageService } from './storage.service';
import { IonicStorageModule } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),   IonicStorageModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule ,
    Ionic4DatepickerModule,

    AppRoutingModule,],
  providers: [
    StatusBar,
    SplashScreen,
    ComponentServiceService,
    HeremapService,
    ApiService,
    Geolocation,
    Camera,
    StorageService,    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
