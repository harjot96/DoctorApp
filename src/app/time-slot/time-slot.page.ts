import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.page.html',
  styleUrls: ['./time-slot.page.scss'],
})
export class TimeSlotPage implements OnInit {
  doctorId:any='';
  constructor(public navctrl:NavController, public route:ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.doctorId = JSON.parse(params.data);
        console.log(this.doctorId)
       }
      })
   }

  ngOnInit() {
  }

  bookslot(){
    this.navctrl.navigateForward('start/tabs/payment')
  }
}
