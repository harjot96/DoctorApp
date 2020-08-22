import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ComponentServiceService } from '../component-service.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OTPPage implements OnInit {
  userId: any;
  otp:FormGroup;

  constructor(public navctrl:NavController,public storage:StorageService,public api:ApiService,public component:ComponentServiceService) {
    this.storage.getObject('user_Id').then((data)=>{
      this.userId=data
    })
    console.log(this.userId);

   }

  ngOnInit() {
    this.optForm();
  }

  optForm():void{
    this.otp=new FormGroup({
      one:new FormControl('',Validators.required),
      two:new FormControl('',Validators.required),
      three:new FormControl('',Validators.required),
      four:new FormControl('',Validators.required),
    })
  }

  profile()
  {
    console.log(this.userId);
    if(this.otp.valid)
    {
      this.component.presentLoading('otp')
      let data=this.otp.controls.one.value+this.otp.controls.two.value+this.otp.controls.three.value+this.otp.controls.four.value;
      let fd=new FormData();
      fd.append('user_id',this.userId),
      fd.append('otp',data),
      fd.append('device_token','aezdwt7851seew2'),
      fd.append('device_type','ios')
    this.api.Signup('otp_verify.php',fd).subscribe((res:any)=>{
      console.log(res);
      if(res.status==='Success')
      {
        this.component.dismissLoader('otp');
        this.navctrl.navigateForward('aggrement');
        this.component.presentToast(res.message,'success');
        this.storage.setObject('user_token',res.data.user_token);
      }
      else{
        this.component.presentToast(res.message,'danger');
        this.component.dismissLoader('otp');

      }
    },err=>{
      if(err)
      {
        this.component.dismissLoader('otp');
        this.component.presentToast(err.message,'danger');


      }
    })
    }

  }

}
