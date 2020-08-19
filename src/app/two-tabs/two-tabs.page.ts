import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HeremapService } from '../heremap.service';

declare var google:any;
@Component({
  selector: 'app-two-tabs',
  templateUrl: './two-tabs.page.html',
  styleUrls: ['./two-tabs.page.scss'],
})
export class TwoTabsPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  markers: any = [];
  map: any;
  segment: string='sunny'

  constructor(public navctrl:NavController, public hereMap: HeremapService) { }

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
this.navctrl.navigateForward('time-slot')
  }

  loadMap() {   
      let latLng = new google.maps.LatLng(40.7128,74.0060);
      let mapOptions = {
        center: latLng,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      console.log(this.map)
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.7128, 74.0060),
        map: this.map,
      });
    console.log(marker,"marker")
    
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
