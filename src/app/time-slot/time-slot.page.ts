import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.page.html',
  styleUrls: ['./time-slot.page.scss'],
})
export class TimeSlotPage implements OnInit {

  constructor(public navctrl:NavController) { }

  ngOnInit() {
  }

  bookslot(){
    this.navctrl.navigateForward('start/tabs/payment')
  }
}
