import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.page.html',
  styleUrls: ['./agreement.page.scss'],
})
export class AgreementPage implements OnInit {

  constructor(public navctrl:NavController) { }

  ngOnInit() {
  }

  accept()
  {
this.navctrl.navigateForward('profile-pic')
  }

}
