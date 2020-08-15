import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthIssuePage } from './health-issue.page';

const routes: Routes = [
  {
    path: '',
    component: HealthIssuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthIssuePageRoutingModule {}
