import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ComponentServiceService } from '../component-service.service';
import { StorageService } from '../storage.service';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile1',
  templateUrl: './profile1.page.html',
  styleUrls: ['./profile1.page.scss'],
})
export class Profile1Page implements OnInit {
  readonly:boolean=true;
  userData:any;
  profileForm:FormGroup;

  constructor(public navctrl:NavController,public api:ApiService,public component:ComponentServiceService,public storage:StorageService) { 
    let userid=JSON.parse(localStorage.getItem('userData')) 
      let fd=new FormData();
      fd.append('user_id',userid.user_id);
  this.api.post('view_profile.php',fd).subscribe((res:any)=>{
  console.log(res);
  this.userData=res.data;
  this.profileForm.patchValue(res.data)
    },err=>{
      if(err)
      {
        this.component.presentAlert(err.message)
      }
    })
  }

  ngOnInit() {
    this.initProfileForm();
  }

  openSetting(){
this.navctrl.navigateForward('setting')
  }


  editProfile()
  {
let alert= this.component.alert.create({
  header:'Alert',
  mode:'ios',
  message:'Want to edit profile?',
  buttons:[{
    text:'No',
    role:'close',
  },
{
  text:'Yes',
  handler:()=>{
this.readonly=false;
  }
}]
})
alert.then((res)=>{
  res.present();
})

  }

  initProfileForm():void{
    this.profileForm=new FormGroup({
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      pin_code: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
    

      
    })
  }

  update()
  {
    this.readonly=true;
  }

}
