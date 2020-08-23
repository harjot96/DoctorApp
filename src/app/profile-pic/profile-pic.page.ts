import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ComponentServiceService } from '../component-service.service';
import { StorageService } from '../storage.service';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.page.html',
  styleUrls: ['./profile-pic.page.scss'],
})
export class ProfilePicPage implements OnInit {
  imageUpload='';
  user_token: any;
  profileName:FormGroup;
  fd=new FormData();
  constructor(public navCtrl:NavController,public api:ApiService, public actionSheetController:ActionSheetController,public camera:Camera,public component:ComponentServiceService,public storage:StorageService) {
    this.storage.getObject('user_token').then((data)=>{
      this.user_token=data;
          })

   }
  ngOnInit() {
this.profilenameForm();
  }

profile()
{
  if(this.profileName.valid)
  {
    this.component.presentLoading('profilepic');
    this.fd.append('user_token',this.user_token),
    this.fd.append('name',this.profileName.controls.name.value)
    this.api.post('profile_name_image.php',this.fd).subscribe((res:any)=>{
      console.log(res);
    if(res.status==='Success')
    {
      
      this.component.dismissLoader('profilepic');
      this.navCtrl.navigateForward('profile2')
      this.component.presentToast(res.message,'success')
    }
    else{
      this.component.dismissLoader('profilepic');
      this.component.presentToast(res.message,'danger');
    }
    },err=>{
      if(err)
      {
        this.component.dismissLoader('profilepic');
      this.component.presentToast(err.message,'danger');
      }
    })

  }

}  

openCamera(sourceType) {
  const options: CameraOptions = {
    quality: 30,
    sourceType: sourceType,
    destinationType: this.camera.DestinationType.DATA_URL,
    targetWidth: 300,
    targetHeight: 300,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    saveToPhotoAlbum: false,
  }

  this.camera.getPicture(options).then((imageData) => {
    this.fd.delete('image');
    this.imageUpload = 'data:image/jpeg;base64,' + imageData;
    this.fd.append('image',this.imageUpload);


  }, (err) => {
    // Handle error
    this.component.presentAlert(JSON.stringify(err))
  });

}

profilenameForm():void{
  this.profileName=new FormGroup({
    name:new FormControl('',Validators.required)
  })
}
async selectImage() {
  const actionSheet = await this.actionSheetController.create({
    buttons: [{
      text: 'Load from Library',
      handler: () => {
        this.openCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
      }
    },
    {
      text: 'Use Camera',
      handler: () => {
        this.openCamera(this.camera.PictureSourceType.CAMERA);
      }
    },
    {
      text: 'Cancel',
      role: 'cancel'
    }
    ]
  });
  await actionSheet.present();
}

}
