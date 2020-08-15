import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.page.html',
  styleUrls: ['./profile2.page.scss'],
})
export class Profile2Page implements OnInit {

  constructor(public navctrl:NavController) { }

  ngOnInit() {
  }


  home()
  {
this.navctrl.navigateRoot('start')
  }

}
