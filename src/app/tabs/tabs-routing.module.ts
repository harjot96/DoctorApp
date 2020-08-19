import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../symptoms/symptoms.module').then(m => m.SymptomsPageModule)
      },
      
      {
        path: 'tab2',
        loadChildren: () => import('../appointment-list2/appointment-list2.module').then(m => m.AppointmentList2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../calling/calling.module').then(m => m.CallingPageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../messages/messages.module').then(m => m.MessagesPageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('../profile1/profile1.module').then(m => m.Profile1PageModule)
      },
   
      {
        path: '',
        redirectTo: '/start/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/start/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
