import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeSlotPage } from './time-slot.page';

const routes: Routes = [
  {
    path: '',
    component: TimeSlotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeSlotPageRoutingModule {}
