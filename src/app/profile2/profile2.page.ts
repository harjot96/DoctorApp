import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ComponentServiceService } from '../component-service.service';
import { StorageService } from '../storage.service';
declare var google: any;

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.page.html',
  styleUrls: ['./profile2.page.scss'],
})
export class Profile2Page implements OnInit {
  profileForm: FormGroup;
  user_token: any;
  autocompleteItems;
  autocomplete;
  latitude: any = 0;
  longitude: any = 0;
  geo: any;
  service = new google.maps.places.AutocompleteService();

  constructor(public zone: NgZone, public loadingController: LoadingController, public navctrl: NavController, public api: ApiService, public component: ComponentServiceService, public storage: StorageService) {
    this.storage.getObject('user_token').then((data) => {
      this.user_token = data;
    })
    this.autocompleteItems = [];

  }

  ngOnInit() {
    this.profile();
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


  home() {
    if (this.profileForm.valid) {
      this.component.presentLoading('profile');
      let fd = new FormData();
        fd.append('gender', this.profileForm.controls.gender.value),
        fd.append('email', this.profileForm.controls.email.value),
        fd.append('location', this.profileForm.controls.location.value),
        fd.append('city', this.profileForm.controls.city.value),
        fd.append('pin_code', this.profileForm.controls.pincode.value),
        fd.append('user_token', this.user_token),
        fd.append('lat', this.latitude),
        fd.append('lng', this.longitude)
      this.api.post('basic_info.php', fd).subscribe((res: any) => {
        if (res.status === 'Success') {
          this.component.dismissLoader('profile')
          this.component.presentToast(res.message, 'success');
          console.log(res);
          this.navctrl.navigateRoot('start');
        }
        else {
          this.component.dismissLoader('profile');
          this.component.presentToast(res.message, 'danger');


        }
      })

    }
  }

  profile(): void {
    this.profileForm = new FormGroup({
      gender: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    })
  }

}
