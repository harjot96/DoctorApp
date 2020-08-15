import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  constructor(public navctrl:NavController) { }

  ngOnInit() {
  }



  otp()
  {
    this.navctrl.navigateForward('otp')
  }

}
