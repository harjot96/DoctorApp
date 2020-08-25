import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.page.html',
  styleUrls: ['./symptoms.page.scss'],
})
export class SymptomsPage implements OnInit {
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
  currentLocation:any='';
  constructor(public httpClient:HttpClient,public nactrl:NavController,public router:Router,public api: ApiService,public geolocation:Geolocation) { }

  ngOnInit() {
  this.getCurrentLatLong();
  }

  
  view(data){
    this.api.subcaategoryData = data;
    // this.router.navigate([ 'tabs', 'two-tabs' ]);
    this.nactrl.navigateForward('start/tabs/two-tabs');
      }

  viewmore(){
    this.nactrl.navigateForward('health-issue')
  }
  ionViewDidEnter() {
    this.getSymptoms();
    this.getSpecialist();
    this.getChronic();
    this.getOrgan();
  }
  getCurrentLatLong() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      this.httpClient.get('https://nominatim.openstreetmap.org/search?format=geojson&q=' + resp.coords.latitude + ',' + resp.coords.longitude).subscribe(data => {
        console.log('newdata', data);
        if (data['features'].length > 0) {
          this.currentLocation = data['features'][0].properties.display_name;
        } else {
        }
      })
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  getSymptoms() {
    // this.component.presentLoading('symptoms');
    this.fd.append('category_id', '1')
    this.api.post('subcategorylist.php', this.fd).subscribe((res: any) => {
      console.log(res);
      // this.component.dismissLoader('symptoms');
      if (res.status === 'Success') {
        this.symptomData = res.data;
        console.log(this.symptomData ,"symptom data")
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
        console.log(this.specialistData, "top specialist")
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
}
