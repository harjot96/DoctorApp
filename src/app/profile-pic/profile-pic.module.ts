import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePicPageRoutingModule } from './profile-pic-routing.module';

import { ProfilePicPage } from './profile-pic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfilePicPageRoutingModule
  ],
  declarations: [ProfilePicPage]
})
export class ProfilePicPageModule {}
