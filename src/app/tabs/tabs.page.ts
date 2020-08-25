import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
userData:any='';
  constructor() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.userData);
  }

}
