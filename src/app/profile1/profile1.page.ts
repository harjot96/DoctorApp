import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile1',
  templateUrl: './profile1.page.html',
  styleUrls: ['./profile1.page.scss'],
})
export class Profile1Page implements OnInit {

  constructor(public navctrl:NavController) { }

  ngOnInit() {
  }

  openSetting(){
this.navctrl.navigateForward('setting')
  }

}
