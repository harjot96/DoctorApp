import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoCallingPageRoutingModule } from './video-calling-routing.module';

import { VideoCallingPage } from './video-calling.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoCallingPageRoutingModule
  ],
  declarations: [VideoCallingPage]
})
export class VideoCallingPageModule {}
