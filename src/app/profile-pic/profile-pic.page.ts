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
  profileName: FormGroup;
  registerData:any='';
  fd = new FormData();
  constructor(public navCtrl: NavController, public api: ApiService, public actionSheetController: ActionSheetController, public camera: Camera, public component: ComponentServiceService, public storage: StorageService) {
    this.storage.getObject('user_token').then((data) => {
      this.user_token = data;
      console.log(this.user_token, data)
    })
    this.registerData = JSON.parse(localStorage.getItem('registerData'));

  }
  ngOnInit() {
    this.profilenameForm();
  }

  profile() {
    if (this.profileName.valid) {
      this.component.presentLoading('profile-pic');
      this.fd.append('user_token',this.registerData.token),
        this.fd.append('name', this.profileName.controls.name.value)
        this.api.post('profile_name_image.php', this.fd).subscribe((res: any) => {
        console.log(res);
        this.component.dismissLoader('profile-pic');
        if (res.status === 'Success') {
          this.component.presentToast(res.message, 'success');
          this.navCtrl.navigateForward('profile2')
        } else {

          this.component.presentToast(res.message, 'danger')
        }
      })

    }

    // this.navCtrl.navigateForward('profile2')
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
      this.fd.append('image', this.imageUpload);


    }, (err) => {
      
      this.component.presentAlert(JSON.stringify(err))
    });

  }

  profilenameForm(): void {
    this.profileName = new FormGroup({
      name: new FormControl('', Validators.required)
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
