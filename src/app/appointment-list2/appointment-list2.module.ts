import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentList2PageRoutingModule } from './appointment-list2-routing.module';

import { AppointmentList2Page } from './appointment-list2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentList2PageRoutingModule
  ],
  declarations: [AppointmentList2Page]
})
export class AppointmentList2PageModule {}
