import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { ComponentServiceService } from '../component-service.service';
import { StorageService } from '../storage.service';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
declare var google: any;

@Component({
  selector: 'app-profile1',
  templateUrl: './profile1.page.html',
  styleUrls: ['./profile1.page.scss'],
})
export class Profile1Page implements OnInit {
  readonly: boolean = true;
  userData: any;
  autocompleteItems;
  autocomplete;
  user_token: any;
  profileForm: FormGroup;
  fd = new FormData();
  image: string = ''
  uploadImage: string = '';
  latitude: any = 0;
  longitude: any = 0;
  geo: any;
  service = new google.maps.places.AutocompleteService();
  user: any;
  constructor(public zone: NgZone, public navctrl: NavController, public api: ApiService, public component: ComponentServiceService, public storage: StorageService, public camera: Camera, public actionSheetController: ActionSheetController) {
    this.userData = JSON.parse(localStorage.getItem('userData'))
    let fd = new FormData();
    this.user_token = this.userData.token;

    fd.append('user_id', this.userData.user_id);
    this.api.post('view_profile.php', fd).subscribe((res: any) => {
      console.log(res);
      this.user = res.data;
      this.image = res.data.profile_image;
      this.profileForm.patchValue(res.data)
    }, err => {
      if (err) {
        this.component.presentAlert(err.message)
      }
    })
  }

  ngOnInit() {
    this.initProfileForm();
  }

  getUserProfile(id) {
    let fd = new FormData();
    fd.append('user_id', id);
    this.api.post('view_profile.php', fd).subscribe((res: any) => {
      console.log(res);
      this.user = res.data;
      this.profileForm.patchValue(res.data)
    }, err => {
      if (err) {
        this.component.presentAlert(err.message)
      }
    })
  }
  openSetting() {
    this.navctrl.navigateForward('setting')
  }


  editProfile() {
    let alert = this.component.alert.create({
      header: 'Alert',
      mode: 'ios',
      message: 'Want to edit profile?',
      buttons: [{
        text: 'No',
        role: 'close',
      },
      {
        text: 'Yes',
        handler: () => {
          this.readonly = false;
        }
      }]
    })
    alert.then((res) => {
      res.present();
    })

  }

  initProfileForm(): void {
    this.profileForm = new FormGroup({
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      pin_code: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),




    })
  }
  chooseItem(item: any) {
    console.log(item);
    this.geo = item;
    this.geoCode(this.geo); //convert Address to lat and long
  }
  geoCode(address: any) {

    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      this.autocompleteItems = [];
      this.profileForm.controls.location.setValue(address);

    });
  }
  dismiss() {
    this.autocomplete = [];
    // this.viewCtrl.dismiss();
  }
  updateSearch() {
    console.log("enter");
    console.log(this.profileForm.value.location);
    if (this.profileForm.value.location == "") {
      this.autocompleteItems = [];
      return;
    }

    let me = this;
    this.service.getPlacePredictions(
      {
        input: this.profileForm.value.location,
      },
      (predictions, status) => {
        me.autocompleteItems = [];
        console.log(predictions);
        me.zone.run(() => {
          if (predictions != null) {
            predictions.forEach((prediction) => {
              me.autocompleteItems.push(prediction.description);
            });
            // this.autocomplete.query= predictions[0].description;
            console.log(me.autocompleteItems);
          }
        });
      }
    );
  }

  update() {
    this.readonly = true;
    if (this.profileForm.valid) {
      this.component.presentLoading('update');
      this.fd.append('user_token', this.user_token),
        this.fd.append('mobile', this.profileForm.controls.mobile.value),
        this.fd.append('location', this.profileForm.controls.location.value),
        this.fd.append('city', this.profileForm.controls.city.value),
        this.fd.append('pin_code', this.profileForm.controls.pin_code.value),
        this.fd.append('lat', this.latitude),
        this.fd.append('lng', this.longitude)
      this.fd.append('email', this.profileForm.controls.email.value)
      if (this.uploadImage === '') {
        this.fd.append('image_status', '0')
      }
      else {
        this.fd.append('image_status', '1')

      }
      this.api.post('edit_profile.php', this.fd).subscribe((res: any) => {
        console.log('edit profile', res);
        if (res) {
          this.component.dismissLoader('update')
          this.getUserProfile(this.userData.user_id);
          this.component.presentToast(res.message, 'success')
        }
        else {
          this.component.dismissLoader('update')
        }

      }, err => {
        if (err) {
          this.component.presentToast(err.message, 'danger')

          this.component.dismissLoader('update')

        }
      })
    }



  }

  // imageUpload(){

  // }

  imageUpload(sourceType) {
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
      this.uploadImage = 'data:image/jpeg;base64,' + imageData;
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.fd.append('image', this.uploadImage)




    }, (err) => {

      this.component.presentAlert(JSON.stringify(err))
    });

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
  }

}
