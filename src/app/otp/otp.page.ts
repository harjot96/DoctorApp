import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OTPPage implements OnInit {

  constructor(public navctrl:NavController) { }

  ngOnInit() {
  }

  profile()
  {
this.navctrl.navigateForward('aggrement')
  }

}
