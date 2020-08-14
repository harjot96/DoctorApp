import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorDetail2Page } from './doctor-detail2.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorDetail2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorDetail2PageRoutingModule {}
