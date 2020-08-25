import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
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
  fd = new FormData();
  latitude: any = 0;
  longitude: any = 0;
  geo: any;
  service = new google.maps.places.AutocompleteService();
  userData: any = '';
  symptomData: any = [];
  specialistData: any = [];
  organData: any = [];
  chronicData: any = [];
  roleData: any = [];
  constructor(public zone: NgZone, public loadingController: LoadingController, public navctrl: NavController, public api: ApiService, public component: ComponentServiceService, public storage: StorageService) {
    this.user_token = localStorage.getItem('token');
    this.userData = JSON.parse(localStorage.getItem('registerData'));
    this.autocompleteItems = [];
  }

  ionViewDidEnter() {
    this.getSymptoms();
    this.getSpecialist();
    this.getChronic();
    this.getOrgan();
    this.getRole();
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
      let url;
        if(this.userData.role == 'client'){
          fd.append('email', this.profileForm.controls.email.value);
          url = 'basic_info.php';
        }else{
          url = 'basic_info_doctor.php';
          fd.append('doctor_role',this.userData.user_id)
          fd.append('specialist',this.profileForm.controls.specialist.value.toString())
          fd.append('symptoms',this.profileForm.controls.symptoms.value.toString())
          fd.append('organ_health',this.profileForm.controls.organ.value.toString())
          fd.append('chronic',this.profileForm.controls.chronic.value.toString())
          fd.append('description',this.profileForm.controls.description.value)
        }
        fd.append('gender', this.profileForm.controls.gender.value)
        fd.append('location', this.profileForm.controls.location.value),
        fd.append('city', this.profileForm.controls.city.value),
        fd.append('pin_code', this.profileForm.controls.pincode.value),
        fd.append('user_token', this.user_token),
        fd.append('lat', this.latitude),
        fd.append('lng', this.longitude)
          this.api.post(url, fd).subscribe((res: any) => {
        if (res.status === 'Success') {
          this.component.dismissLoader('profile')
          this.component.presentToast(res.message, 'success');
          console.log(res);
          localStorage.setItem('userData',JSON.stringify(this.userData))
          // this.navctrl.navigateRoot('start');
          if(this.userData?.role == 'client'){
            this.navctrl.navigateRoot('start');
          }else{
            this.navctrl.navigateRoot('start/tabs/tab2');
          }
        }
        else {
          this.component.dismissLoader('profile');
          this.component.presentToast(res.message, 'danger');


        }
      })

    }else{
      this.profileForm.markAllAsTouched();
    }
  }

  profile(): void {
    this.profileForm = new FormGroup({
      gender: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      email: new FormControl(''),
      description: new FormControl(''),
      symptoms: new FormControl(''),
      specialist: new FormControl(''),
      organ: new FormControl(''),
      chronic: new FormControl(''),
      role: new FormControl('')
    })
    if (this.userData.role == 'doctor') {
      this.profileForm.get('description').setValidators(Validators.required)
      this.profileForm.get('symptoms').setValidators(Validators.required)
      this.profileForm.get('specialist').setValidators(Validators.required)
      this.profileForm.get('organ').setValidators(Validators.required)
      this.profileForm.get('chronic').setValidators(Validators.required)
      this.profileForm.get('role').setValidators(Validators.required)
      // let control: AbstractControl = this.profileForm.controls['email'];
      // var check = control.validator(control).hasOwnProperty('required');
      // console.log(check)
      // if (check) {
        this.profileForm.get('email').clearValidators();
      // }
    } else {
      // this.profileForm.get('email').setValidators(Validators.required)
      // let control: AbstractControl = this.profileForm.controls['description'];
      // var check = control.validator(control).hasOwnProperty('required');
      // console.log(check)
      // if (check) {
        this.profileForm.get('description').clearValidators();
      // }
      // let controlsymptoms: AbstractControl = this.profileForm.controls['symptoms'];
      // var checksymptoms = controlsymptoms.validator(controlsymptoms).hasOwnProperty('required');
      // console.log(check)
      // if (checksymptoms) {
        this.profileForm.get('symptoms').clearValidators();
      // }
      // let controlspecialist: AbstractControl = this.profileForm.controls['specialist'];
      // var checkspecialist= controlspecialist.validator(controlspecialist).hasOwnProperty('required');
      // console.log(checkspecialist)
      // if (checkspecialist) {
        this.profileForm.get('specialist').clearValidators();
      // }
      // let controlorgan: AbstractControl = this.profileForm.controls['organ'];
      // var checkorgan= controlorgan.validator(controlorgan).hasOwnProperty('required');
      // console.log(checkspecialist)
      // if (checkorgan) {
        this.profileForm.get('organ').clearValidators();
      // }
      // let controlchronic: AbstractControl = this.profileForm.controls['chronic'];
      // var checkchronic= controlchronic.validator(controlchronic).hasOwnProperty('required');
      // console.log(checkchronic)
      // if (checkchronic) {
        this.profileForm.get('chronic').clearValidators();
      // }
      // let controlrole: AbstractControl = this.profileForm.controls['role'];
      // var checkrole= controlrole.validator(controlrole).hasOwnProperty('required');
      // console.log(checkrole)
      // if (checkrole) {
        this.profileForm.get('role').clearValidators();
      // }
    }
  }
  getSymptoms() {
    // this.component.presentLoading('symptoms');
    this.fd.append('category_id', '1')
    this.api.post('subcategorylist.php', this.fd).subscribe((res: any) => {
      console.log(res);
      // this.component.dismissLoader('symptoms');
      if (res.status === 'Success') {
        this.symptomData = res.data;
      } else {
        this.symptomData = [];
      }
    })
  }
  getSpecialist() {
    // this.component.presentLoading('symptoms');
    this.fd.append('category_id', '2')
    this.api.post('subcategorylist.php', this.fd).subscribe((res: any) => {
      console.log(res);
      // this.component.dismissLoader('symptoms');
      if (res.status === 'Success') {
        this.specialistData = res.data;
      } else {
        this.specialistData = [];
      }
    })
  }
  getOrgan() {
    // this.component.presentLoading('symptoms');
    this.fd.append('category_id', '3')
    this.api.post('subcategorylist.php', this.fd).subscribe((res: any) => {
      console.log(res);
      // this.component.dismissLoader('symptoms');
      if (res.status === 'Success') {
        this.organData = res.data;
      } else {
        this.organData = [];
      }
    })
  }
  getChronic() {
    // this.component.presentLoading('symptoms');
    this.fd.append('category_id', '4')
    this.api.post('subcategorylist.php', this.fd).subscribe((res: any) => {
      console.log(res);
      // this.component.dismissLoader('symptoms');
      if (res.status === 'Success') {
        this.chronicData = res.data;
      } else {
        this.chronicData = [];
      }
    })
  }
  getRole() {
    this.fd.append('category_id', "5")
    this.api.post('subcategorylist.php', this.fd).subscribe((res: any) => {
      console.log(res);
      // this.component.dismissLoader('symptoms');
      if (res.status === 'Success') {
        this.roleData = res.data;
      } else {
        this.roleData = [];
      }
    })  
}
}
