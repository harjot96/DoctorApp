import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthIssuePageRoutingModule } from './health-issue-routing.module';

import { HealthIssuePage } from './health-issue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthIssuePageRoutingModule
  ],
  declarations: [HealthIssuePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HealthIssuePageModule {}
