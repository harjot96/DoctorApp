import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-symptoms',
  templateUrl: './symptoms.page.html',
  styleUrls: ['./symptoms.page.scss'],
})
export class SymptomsPage implements OnInit {

  constructor(public nactrl:NavController) { }

  ngOnInit() {
  }

  
  view(){
    this.nactrl.navigateRoot('two-tabs');
      }

  viewmore(){
this.nactrl.navigateForward('health-issue')
  }

}
