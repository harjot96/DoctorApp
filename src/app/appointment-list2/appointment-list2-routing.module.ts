import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentList2Page } from './appointment-list2.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentList2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentList2PageRoutingModule {}
