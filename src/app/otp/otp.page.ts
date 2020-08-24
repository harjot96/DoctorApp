import { Component, OnInit,ViewChild } from '@angular/core';
import { NavController,IonInput } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ComponentServiceService } from '../component-service.service';
declare var $:any;
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OTPPage implements OnInit {
  userId: any;
  verificationForm:FormGroup;
  registerData:any='';
  @ViewChild('input1', { static: false }) input1: IonInput;
  @ViewChild('input2', { static: false }) input2: IonInput;
  @ViewChild('input3', { static: false }) input3: IonInput;
  @ViewChild('input4', { static: false }) input4: IonInput;
  constructor(private formBuilder:FormBuilder,public navctrl:NavController,public storage:StorageService,public api:ApiService,public component:ComponentServiceService) {
    this.verificationForm = this.formBuilder.group({
      input1: ['', Validators.compose([Validators.required])],
      input2: ['', Validators.compose([Validators.required])],
      input3: ['', Validators.compose([Validators.required])],
      input4: ['', Validators.compose([Validators.required])],
    });
    this.storage.getObject('user_Id').then((data)=>{
      this.userId = data
    })
  
    console.log(this.userId);
    var that =this;
    $('body').on('keyup', 'input.phone-input', function(event){
      var key = event.keyCode || event.charCode;  
      console.log(key)    
      var inputs = $('input.phone-input');
      if( key == 8 || key == 46 ){
        var indexNum = inputs.index(this);
        console.log(indexNum, "innn")        
        if(indexNum != 0){     
          if(indexNum == 3){
            that.verificationForm.controls.input4.setValue('');
            document.getElementById("input3").focus();
          }
          if(indexNum == 2){
            that.verificationForm.controls.input3.setValue('');
            document.getElementById("input2").focus();
          } 
          if(indexNum == 1){
            that.verificationForm.controls.input2.setValue('');
            document.getElementById("input1").focus();
          }   
          if(indexNum == 0){
            that.verificationForm.controls.input1.setValue('');
          } 
        // inputs.eq(inputs.index(this) - 1).val('').focus();
        }
      }
      
    });

   }

  ngOnInit() {
    this.registerData = JSON.parse(localStorage.getItem('registerData'))
    }

 

  profile()
  {
    console.log(this.userId);
    if(this.verificationForm.valid)
    {
      this.component.presentLoading('otp')
      var fullotpdata=this.verificationForm.value.input1+this.verificationForm.value.input2+this.verificationForm.value.input3+this.verificationForm.value.input4;
      let fd=new FormData();
      console.log(fullotpdata)
      fd.append('user_id',this.userId),
      fd.append('otp',fullotpdata),
      fd.append('device_token','aezdwt7851seew2'),
      fd.append('device_type','ios')
      this.api.Signup('otp_verify.php',fd).subscribe((res:any)=>{
      console.log(res);
      if(res.status==='Success'){
        this.component.dismissLoader('otp');
        this.navctrl.navigateForward('aggrement');
        this.component.presentToast(res.message,'success');
        localStorage.setItem('token', res.data.user_token)
        this.storage.setObject('user_token',res.data.user_token);
      }else{
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
  otpEnter(evt, val) {
    console.log('OTP', evt.value, val);
    if (evt.value.length) {
      if (val == 1) {
        document.getElementById("input2").focus();
        this.verificationForm.controls.input1.setValue(evt.value);
        // this.input2.setFocus();
      } else if (val == 2) {
        this.verificationForm.controls.input2.setValue(evt.value);

        document.getElementById("input3").focus();
        // this.input3.setFocus();
      } else if (val == 3) {
        this.verificationForm.controls.input3.setValue(evt.value);

        document.getElementById("input4").focus();
        // this.input4.setFocus();
      } else if (val == 4) {
        this.verificationForm.controls.input4.setValue(evt.value);
        
      }
    }
  }
}
