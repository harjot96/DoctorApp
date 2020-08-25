import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HeremapService } from '../heremap.service';
import { ApiService } from '../api.service';

declare var google:any;
@Component({
  selector: 'app-two-tabs',
  templateUrl: './two-tabs.page.html',
  styleUrls: ['./two-tabs.page.scss'],
})
export class TwoTabsPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  markers: any = [];
 locations = [
  {
    "name": "National Museum",
    "state" : "Delhi",
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
  segment: string='sunny'

  constructor(public navctrl:NavController, public hereMap: HeremapService,public api:ApiService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.loadMap();
    },1000)
  // let latlng={
  //   lat:40.7128,
  //   lng:74.0060
  // }
  // let mapOptions = {
  //   center: latlng,
  //   zoom: 15,
  //   mapTypeId: google.maps.MapTypeId.ROADMAP
  // }
  // this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  // this.hereMap.initMap(this.mapElement.nativeElement, latlng);
  // this.hereMap.centerMap(latlng);
  }

  
  bookAppointment()
  {
this.navctrl.navigateForward('start/tabs/time-slot')
  }

  loadMap() {   
      let latLng = new google.maps.LatLng(this.api.Latitude,this.api.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI:false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    // this.addMarker();
    for(let i=0; i<=this.locations.length;i++)
    {
      this.addMarker(this.locations[i])
    }
    
  }
  addMarker(data){
let image="https://img.icons8.com/ultraviolet/40/000000/marker.png";
   const position = new google.maps.LatLng(data.latitude, data.longitude);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position:position,
      icon: image
    
    });
  
    let content = "sdds"          
  
    this.addInfoWindow(marker, content);
  
  }
  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  segmentChanged(ev)
  {
    console.log(ev.target.value);
    if(ev.target.value==='rainy')
    {
      setTimeout(()=>{
        this.loadMap()
      },400)
    }
    
  }
}
