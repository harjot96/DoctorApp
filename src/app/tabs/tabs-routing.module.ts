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
              loadChildren: '../symptoms/symptoms.module#SymptomsPageModule',
      },
      {
        path: 'two-tabs',
        loadChildren: () => import('../two-tabs/two-tabs.module').then(m => m.TwoTabsPageModule)
      },
      {
        path: 'time-slot',
        loadChildren: () => import('../time-slot/time-slot.module').then( m => m.TimeSlotPageModule)
      },
      {
        path:'payment',
        loadChildren:()=> import('../payment/payment.module').then(m=>m.PaymentPageModule)
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
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
