import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'start',
    loadChildren: './tabs/tabs.module#TabsPageModule' },
    

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'profile2',
    loadChildren: () => import('./profile2/profile2.module').then( m => m.Profile2PageModule)
  },
  {
    path: 'profile1',
    loadChildren: () => import('./profile1/profile1.module').then( m => m.Profile1PageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'profile-pic',
    loadChildren: () => import('./profile-pic/profile-pic.module').then( m => m.ProfilePicPageModule)
  },
  {
    path: 'doctor-detail',
    loadChildren: () => import('./doctor-detail/doctor-detail.module').then( m => m.DoctorDetailPageModule)
  },
  {
    path: 'doctor-detail2',
    loadChildren: () => import('./doctor-detail2/doctor-detail2.module').then( m => m.DoctorDetail2PageModule)
  },
  {
    path: 'doctor2',
    loadChildren: () => import('./doctor2/doctor2.module').then( m => m.Doctor2PageModule)
  },
  {
    path: 'doctor-profile',
    loadChildren: () => import('./doctor-profile/doctor-profile.module').then( m => m.DoctorProfilePageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then( m => m.AppointmentPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OTPPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'calling',
    loadChildren: () => import('./calling/calling.module').then( m => m.CallingPageModule)
  },
  {
    path: 'two-tabs',
    loadChildren: () => import('./two-tabs/two-tabs.module').then( m => m.TwoTabsPageModule)
  },
  {
    path: 'appointment-list',
    loadChildren: () => import('./appointment-list/appointment-list.module').then( m => m.AppointmentListPageModule)
  },
  {
    path: 'appointment-list2',
    loadChildren: () => import('./appointment-list2/appointment-list2.module').then( m => m.AppointmentList2PageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'time-slot',
    loadChildren: () => import('./time-slot/time-slot.module').then( m => m.TimeSlotPageModule)
  },
  {path:'aggrement',
  loadChildren:()=>import('./agreement/agreement.module').then(m=>m.AgreementPageModule)
},
{path:'health-issue',
loadChildren:()=>import('./health-issue/health-issue.module').then(m=>m.HealthIssuePageModule)
},
{path:'symptoms',
loadChildren:()=>import('./symptoms/symptoms.module').then(m=>m.SymptomsPageModule)
},
{path:'tab',
loadChildren:()=>import('./two-tabs/two-tabs.module').then(m=>m.TwoTabsPageModule)
},
{
  path:'payment',
  loadChildren:()=> import('./payment/payment.module').then(m=>m.PaymentPageModule)
}

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
