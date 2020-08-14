import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Doctor2Page } from './doctor2.page';

const routes: Routes = [
  {
    path: '',
    component: Doctor2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Doctor2PageRoutingModule {}
