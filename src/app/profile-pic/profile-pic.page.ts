import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.page.html',
  styleUrls: ['./profile-pic.page.scss'],
})
export class ProfilePicPage implements OnInit {

  constructor(public navCtrl:NavController) { }

  ngOnInit() {
  }

profile()
{
  this.navCtrl.navigateForward('profile2')
}  

}
