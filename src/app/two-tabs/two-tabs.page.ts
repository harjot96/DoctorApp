import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HeremapService } from '../heremap.service';
import { ApiService } from '../api.service';
import { ComponentServiceService } from '../component-service.service';
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-two-tabs',
  templateUrl: './two-tabs.page.html',
  styleUrls: ['./two-tabs.page.scss'],
})
export class TwoTabsPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  markers: any = [];
  docterlist: any = [];
  userData: any = '';
  noData: boolean = false;
  locations = [
    {
      "name": "National Museum",
      "state": "Delhi",
      "latitude": 28.6117993,
      "longitude": 77.2194934
    },
    {
      "name": "National Science Centre,",
      "state": "Delhi",
      "latitude": 28.6132098,
      "longitude": 77.245437
    },
    {
      "name": "The Sardar Patel Museum",
      "state": "Gujrat",
      "latitude": 21.1699005,
      "longitude": 72.7955734
    },
    {
      "name": "Library of Tibetan Works and Archives",
      "state": "Himachal",
      "latitude": 32.2263696,
      "longitude": 76.325326

    },
    {
      "name": "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
      "state": "Maharashtra",
      "latitude": 18.926873,
      "longitude": 72.8326132
    },
    {
      "name": "Namgyal Institute of Tibetology",
      "state": "Sikkim",
      "latitude": 27.315948,
      "longitude": 88.6047829

    }
  ];
  map: any;
  segment: string = 'sunny'
  symptomData: any = [];
  selectedSymptom: any;
  constructor(public navCtrl: NavController, public component: ComponentServiceService, public navctrl: NavController, public hereMap: HeremapService, public api: ApiService) {
    console.log(this.api.subcaategoryData, "subData");
    this.userData = JSON.parse(localStorage.getItem('userData'));
    if (this.api.subcaategoryData && this.api.subcaategoryData != '') {
      this.selectedSymptom = this.api.subcaategoryData.subcat_id;
      console.log(this.api.subcaategoryData.subcat_id)
      this.getDoctors();
    }
    if(this.api.cat_id && this.api.cat_id!=''){
    this.getSymptoms();
    }
    $("#sys").change(function () {
      var id = $(this).children(":selected").attr("id");
      console.log(id)
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.loadMap();
    }, 1000)
  }
  select_service(evn) {
    console.log(this.selectedSymptom)
    // this.selectedSymptom = evn.target.value;
    if (this.api.subcaategoryData && this.api.subcaategoryData != '') {
      console.log(this.api.subcaategoryData.subcat_id)
      this.getDoctors();
    }
  }
  getDoctors() {
    var fd = new FormData();
    // this.component.presentLoading('two');
    fd.append('user_token', this.userData?.token),
      fd.append('subcategory_id', this.selectedSymptom)
    this.api.post('doctor_listing.php', fd).subscribe((res: any) => {
      console.log(res);
      // this.component.dismissLoader('two');
      this.noData = true;
      if (res.status === 'Success') {
        this.docterlist = res.data;
      } else {
        this.docterlist = [];
      }
      console.log(this.docterlist)
    })


  }
  bookAppointment(data) {
    this.navctrl.navigateForward(['start/tabs/time-slot'], {queryParams:{data:JSON.stringify(data.doctor_id)}})
  }
  getSymptoms() {
    // this.component.presentLoading('symptoms');
    var fd = new FormData();
    fd.append('category_id', this.api.cat_id)
    this.api.post('subcategorylist.php', fd).subscribe((res: any) => {
      // this.component.dismissLoader('symptoms');
      console.log(res);
      if (res.status == 'Success') {
        this.symptomData = res.data;
        console.log(this.symptomData, "symptom data")
      } else {
        this.symptomData = [];
      }
    })
  }
  loadMap() {
    
    let latLng = new google.maps.LatLng(this.api.Latitude,this.api.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    // this.addMarker();
    for (let i = 0; i <= this.docterlist.length; i++) {
      this.addMarker(this.docterlist[i])
    }

  }
  addMarker(data) {
    let image = "https://img.icons8.com/ultraviolet/40/000000/marker.png";
    const position = new google.maps.LatLng(data.doctor_lat, data.doctor_lng);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position,
      icon: image

    });

    let content =data;

    this.addInfoWindow(marker, content);

  }
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content:content.name
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  segmentChanged(ev) {
    console.log(ev.target.value);
    if (ev.target.value === 'rainy') {
      setTimeout(() => {
        this.loadMap()
      }, 400)
    }

  }

}
