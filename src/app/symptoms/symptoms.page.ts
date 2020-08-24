import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

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
  constructor(public nactrl:NavController,public router:Router,public api: ApiService) { }

  ngOnInit() {
  }

  
  view(){
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
