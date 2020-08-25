import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.page.html',
  styleUrls: ['./time-slot.page.scss'],
})
export class TimeSlotPage implements OnInit {
  doctorId:any='';
  slideOpts = {
    initialSlide: 0,
    slidesPerView:2
    // speed: 400
  };
  datePickerObj: any = {
    closeOnSelect: true,
    monthsList: [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ],
    inputDate: moment(new Date()).format('DD/MM/YYYY'),
    isSundayHighlighted: {
      fontColor: '#ee88bf' // Default null
    },
    momentLocale: 'pt-BR',

    showTodayButton: false,
    weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    dateFormat: 'DD-MM-YYYY',
  };
  slotData=[
    {'value': "08:00 AM", 'class':''},
    {'value': "08:30 AM", 'class':''},
    {'value': "09:00 AM", 'class':''},
    {'value': "09:30 AM", 'class':''},
    {'value': "10:00 AM", 'class':''},
    {'value': "10:30 AM", 'class':''},
    {'value': "11:00 AM", 'class':''},
    {'value': "11:30 AM", 'class':''},
    {'value': "12:00 AM", 'class':''},
    {'value': "12:30 PM", 'class':''},
    {'value': "01:00 PM", 'class':''},
    {'value': "01:30 PM", 'class':''},
    {'value': "02:00 PM", 'class':''},
    {'value': "02:30 PM", 'class':''},
    {'value': "03:00 PM", 'class':''},
    {'value': "03:30 PM", 'class':''},
    {'value': "04:00 PM", 'class':''},
    {'value': "04:30 PM", 'class':''},
    {'value': "05:00 PM", 'class':''},
    {'value': "05:30 PM", 'class':''},
    {'value': "06:00 PM", 'class':''},
    {'value': "06:30 PM", 'class':''},
    {'value': "07:00 PM", 'class':''},
    {'value': "07:30 PM", 'class':''},
    {'value': "08:00 PM", 'class':''},
    {'value': "08:30 PM", 'class':''},
    {'value': "09:00 PM", 'class':''}
    // "09:30 PM",
  ]
  constructor(public navctrl:NavController, public route:ActivatedRoute) {
    console.log(this.slotData, "soltss")
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.doctorId = JSON.parse(params.data);
        console.log(this.doctorId)
       }
      })
   }

  ngOnInit() {
  }
  selectSlot(data,i){
    console.log(data, i, this.slotData, "data");
    var that =this;
    for (var k = 0; k < this.slotData.length; k++) {
      console.log(that.slotData.length)
      console.log(that.slotData[k], k)
      if (this.slotData[k].class && this.slotData[k].class !='') {
        this.slotData[k].class = '';
      }

    }
    this.slotData[i].class = 'active';
    console.log('<<---->>', this.slotData[i]);

  }
  bookslot(){
    this.navctrl.navigateForward('start/tabs/payment')
  }
}
