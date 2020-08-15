import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public navctrl:NavController) { }

  ngOnInit() {
  }




  signup()
  {
    this.navctrl.navigateForward('signup')

  }

  forgetPassword(){
    this.navctrl.navigateForward('forget-password')

  }

  login()
  {
    this.navctrl.navigateRoot('start')
  }
}
