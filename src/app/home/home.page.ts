import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { ComponentServiceService } from '../component-service.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loginForm: FormGroup;
  formStatus: boolean = false;
  constructor(public navctrl: NavController, public api: ApiService, public component: ComponentServiceService, public storage: StorageService) { }

  ngOnInit() {
    this.loginForms();
  }


  loginForms() {

    this.loginForm = new FormGroup({
      mobile: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }




  signup() {
    this.navctrl.navigateForward('signup')

  }

  forgetPassword() {
    this.navctrl.navigateForward('forget-password')

  }

  login() {
    this.formStatus = true;
    if (this.loginForm.valid) {
      this.component.presentLoading('login');
      let fd = new FormData();
      fd.append('mobile', this.loginForm.controls.mobile.value),
        fd.append('password', this.loginForm.controls.password.value),
        fd.append('device_token', 'aezdwt7851seew2'),
        fd.append('device_type', 'ios'),

        this.api.post('login.php', fd).subscribe((res: any) => {
          console.log(res);
          debugger
          if (parseInt(res.data.otp_status) === 1) {
            this.component.presentToast(res.message, 'success')
            this.component.dismissLoader('login')
            if (parseInt(res.data.agreement_status) === 1) {
              if (parseInt(res.data.profile_image_status) === 1) {
                if ( parseInt(res.data.basic_info_status) ===1) {
                  this.navctrl.navigateRoot('start')
                
                }
                else {
                  this.navctrl.navigateForward('profile2')

                }
              }
              else {
                this.navctrl.navigateForward('profile-pic')

              }
            }
            else {
              this.navctrl.navigateRoot('aggrement')

            }
          }
          if (parseInt(res.data.otp_status) === 0) {
            this.component.dismissLoader('login')
            this.navctrl.navigateForward('otp');
            this.storage.setObject('user_Id', res.data.user_id);

            this.component.presentToast(res.message, 'danger')

          }


        }, err => {
          if (err) {
            this.component.dismissLoader('login')

          }
        })

    }
  }
}
