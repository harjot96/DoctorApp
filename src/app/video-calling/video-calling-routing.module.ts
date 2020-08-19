import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoCallingPage } from './video-calling.page';

const routes: Routes = [
  {
    path: '',
    component: VideoCallingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoCallingPageRoutingModule {}
