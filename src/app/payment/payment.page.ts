import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ComponentServiceService } from '../component-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(public navctrl:NavController,public com:ComponentServiceService) { }

  ngOnInit() {
  }

  pay(){


  this.navctrl.navigateForward('/start/tabs/tab2');
  this.com.presentAlert('Appointment booked successfully')
  }
}
