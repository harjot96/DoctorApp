import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Doctor2PageRoutingModule } from './doctor2-routing.module';

import { Doctor2Page } from './doctor2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Doctor2PageRoutingModule
  ],
  declarations: [Doctor2Page]
})
export class Doctor2PageModule {}
