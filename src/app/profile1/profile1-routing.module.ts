import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Profile1Page } from './profile1.page';

const routes: Routes = [
  {
    path: '',
    component: Profile1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Profile1PageRoutingModule {}
