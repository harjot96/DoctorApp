import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorDetail2PageRoutingModule } from './doctor-detail2-routing.module';

import { DoctorDetail2Page } from './doctor-detail2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorDetail2PageRoutingModule
  ],
  declarations: [DoctorDetail2Page]
})
export class DoctorDetail2PageModule {}
