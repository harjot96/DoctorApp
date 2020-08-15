import { Component, OnInit } from '@angular/core';
import { ComponentServiceService } from '../component-service.service';

@Component({
  selector: 'app-calling',
  templateUrl: './calling.page.html',
  styleUrls: ['./calling.page.scss'],
})
export class CallingPage implements OnInit {

  constructor(public component:ComponentServiceService) { }

  ngOnInit() {
  }

  call()
  {
this.component.alertButtons('Want to make call','Lorem Ipsum is simply dummy text of the printing and typesetting industry.')
  }

}
