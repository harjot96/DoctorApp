import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(public navctrl:NavController) { }

  ngOnInit() {
  }
  login(){
this.navctrl.navigateRoot('home')
  }


  opt(){
    this.navctrl.navigateForward('otp');
  }

}
