import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.page.html',
  styleUrls: ['./symptoms.page.scss'],
})
export class SymptomsPage implements OnInit {

  constructor(public nactrl:NavController,public router:Router) { }

  ngOnInit() {
  }

  
  view(){
    // this.router.navigate([ 'tabs', 'two-tabs' ]);
    this.nactrl.navigateForward('start/tabs/two-tabs');
      }

  viewmore(){
this.nactrl.navigateForward('health-issue')
  }

}
