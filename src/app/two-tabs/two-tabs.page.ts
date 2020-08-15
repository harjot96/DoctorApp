import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-two-tabs',
  templateUrl: './two-tabs.page.html',
  styleUrls: ['./two-tabs.page.scss'],
})
export class TwoTabsPage implements OnInit {

  constructor(public navctrl:NavController) { }

  ngOnInit() {
  }

  bookAppointment()
  {
this.navctrl.navigateForward('time-slot')
  }

}
