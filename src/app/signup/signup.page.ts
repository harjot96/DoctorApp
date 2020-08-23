import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ComponentServiceService } from '../component-service.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm:FormGroup;
  formStatus:boolean=false;
  constructor(public navctrl:NavController,public api:ApiService,public component:ComponentServiceService,public storage:StorageService) { }

  ngOnInit() {
    this.signupForms();
  }
  login(){
this.navctrl.navigateRoot('home')
  }

  signupForms():void{
    this.signupForm=new FormGroup({
      mobile:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      role:new FormControl('',Validators.required),
      confirmpassword:new FormControl('',Validators.required)
    })

  }


  opt(){
    this.formStatus=true;
    if(this.signupForm.valid)
    {
      this.component.presentLoading('signup');
    let fd=new FormData();
    if(this.signupForm.controls.password.value===this.signupForm.controls.confirmpassword.value){
      fd.append('password',this.signupForm.controls.password.value)
      fd.append('mobile',this.signupForm.controls.mobile.value)
      fd.append('role',this.signupForm.controls.role.value)
      this.api.Signup('signup.php',fd).subscribe((res:any)=>{
        console.log(res);
        if(res.status==='Success')
        {
          this.component.dismissLoader('signup');
          this.storage.setObject('user_Id',res.data.user_id);
          this.navctrl.navigateForward('otp')
        this.component.presentToast(res.message,'success');
        }
        else{
          this.component.dismissLoader('signup');
          this.component.presentToast(res.message,'danger');

        }
        },err=>{
          if(err)
          {
        this.component.dismissLoader('signup');
            this.component.presentAlert(err.message)
          }
        })
    }
    else{
      
this.component.presentAlert('Password and ConfirmPassword not match')
    }
    }
    // this.navctrl.navigateForward('otp');
  }

}
