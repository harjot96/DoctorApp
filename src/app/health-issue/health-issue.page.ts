import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector:'app-health-issue' ,
  templateUrl: './health-issue.page.html',
  styleUrls: ['./health-issue.page.scss'],
})
export class HealthIssuePage implements OnInit {

  private readonly newProperty = 'app-health-issue';

  constructor(public navctrl:NavController) { }

  ngOnInit() {
  }

  viewMore(){
this.navctrl.navigateRoot('two-tabs');
  }
}
