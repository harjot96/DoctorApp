import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),   IonicStorageModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,],
  providers: [
    StatusBar,
    SplashScreen,
    ComponentServiceService,
    HeremapService,
    ApiService,
    Camera,
StorageService,    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
