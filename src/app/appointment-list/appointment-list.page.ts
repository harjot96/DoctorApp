import { Component, OnInit } from '@angular/core';
import { ComponentServiceService } from '../component-service.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.page.html',
  styleUrls: ['./appointment-list.page.scss'],
})
export class AppointmentListPage implements OnInit {

  constructor(public component:ComponentServiceService) { }

  ngOnInit() {
  }


  accept(){
// this.component.presentAlert('Lorem Ipsum is simply dummy text').then()
this.component.presentToast('Lorem Ipsum is simply dummy text','success')
}



  decline()
  {
    this.component.presentAlert('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry')

  }
}
