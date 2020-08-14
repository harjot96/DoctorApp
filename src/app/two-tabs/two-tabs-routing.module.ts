import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwoTabsPage } from './two-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TwoTabsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwoTabsPageRoutingModule {}
