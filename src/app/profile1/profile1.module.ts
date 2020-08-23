import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Profile1PageRoutingModule } from './profile1-routing.module';

import { Profile1Page } from './profile1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Profile1PageRoutingModule
  ],
  declarations: [Profile1Page]
})
export class Profile1PageModule {}
