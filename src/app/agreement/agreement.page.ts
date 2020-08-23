import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ComponentServiceService } from '../component-service.service';
import { ApiService } from '../api.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.page.html',
  styleUrls: ['./agreement.page.scss'],
})
export class AgreementPage implements OnInit {
user_token:any;
registerData:any='';
  constructor(public navctrl:NavController,public component:ComponentServiceService,public api:ApiService,public storage:StorageService) {
    this.storage.getObject('user_token').then((data)=>{
      this.user_token=data;
    })

   }

  ngOnInit() {
    this.registerData = JSON.parse(localStorage.getItem('registerData'));
    console.log(this.registerData)
  }

  decline()
  {
  let alert=  this.component.alert.create({
      header:'Are you Sure?',
      message:'Want to decline the agreement',
      cssClass:'agreement',
      mode:'ios',
      buttons:[{
        text:'No',
        role:'close',
        cssClass:'close',
      },
    {
      text:'Yes',
      handler:()=>{
this.navctrl.navigateRoot('home')
      },
      cssClass:'yes'
    }]
    })
    alert.then((res)=>{
      res.present();
    })
  }

  accept()
  {

    this.component.presentLoading('agreement');
    let fd=new FormData();
    fd.append('user_token',this.registerData.token),
    fd.append('agreement_status','1')
    this.api.post('agreement.php',fd).subscribe((res:any)=>{
      console.log(res);
      if(res.status==='Success')
      {
        this.component.dismissLoader('agreement');
        this.component.presentToast(res.message,'success');      
        this.navctrl.navigateForward('profile-pic')
      }
      else{
        this.component.dismissLoader('agreement');

        this.component.presentToast(res.message,'danger')
      }
    },err=>{
      if(err)
      {
this.component.presentToast(err.message,'danger');      
        
      this.component.dismissLoader('agreement');

      }
    })
  }

}
