import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeSlotPageRoutingModule } from './time-slot-routing.module';

import { TimeSlotPage } from './time-slot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeSlotPageRoutingModule
  ],
  declarations: [TimeSlotPage]
})
export class TimeSlotPageModule {}
