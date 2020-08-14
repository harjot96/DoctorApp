import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TwoTabsPageRoutingModule } from './two-tabs-routing.module';

import { TwoTabsPage } from './two-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TwoTabsPageRoutingModule
  ],
  declarations: [TwoTabsPage]
})
export class TwoTabsPageModule {}
