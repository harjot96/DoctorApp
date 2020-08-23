import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ComponentServiceService } from '../component-service.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.page.html',
  styleUrls: ['./profile2.page.scss'],
})
export class Profile2Page implements OnInit {
  profileForm:FormGroup;
  user_token: any;
  constructor(public navctrl:NavController,public api:ApiService,public component:ComponentServiceService,public storage:StorageService) { 
    this.storage.getObject('user_token').then((data)=>{
      this.user_token=data;
          })
  }

  ngOnInit() {
  this.profile();
  }


  home()
  {
if(this.profileForm.valid)
{
  this.component.presentLoading('profile');
  let fd=new FormData();
  fd.append('gender',this.profileForm.controls.gender.value),
  fd.append('location',this.profileForm.controls.location.value),
  fd.append('city',this.profileForm.controls.city.value),
  fd.append('pin_code',this.profileForm.controls.pincode.value),
  fd.append('user_token',this.user_token),
  fd.append('lat','40.7128'),
  fd.append('lng','74.0060')
  this.api.post('basic_info.php',fd).subscribe((res:any)=>{
    if(res.status==='Success')
    {
      this.component.dismissLoader('profile')
      this.component.presentToast(res.message,'success');
      console.log(res);
      this.navctrl.navigateRoot('start');
    }
    else{
      this.component.dismissLoader('profile');
      this.component.presentToast(res.message,'danger');


    }
  })

}
  }

profile():void{
this.profileForm=new FormGroup({
  gender:new FormControl('',Validators.required),
  location:new FormControl('',Validators.required),
  city:new FormControl('',Validators.required),
  pincode:new FormControl('',Validators.required),



})
}

}
