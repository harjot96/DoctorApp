import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeSlotPageRoutingModule } from './time-slot-routing.module';

import { TimeSlotPage } from './time-slot.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    ReactiveFormsModule,
    TimeSlotPageRoutingModule
  ],
  declarations: [TimeSlotPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TimeSlotPageModule {}
