import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ComponentServiceService } from '../component-service.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.page.html',
  styleUrls: ['./time-slot.page.scss'],
})
export class TimeSlotPage implements OnInit {
  doctorId:any='';
  timeslotForm: FormGroup
  slideOpts = {
    initialSlide: 0,
    slidesPerView:2
    // speed: 400
  };
  tiemArray:any='';
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
  today = moment(new Date()).format('YYYY-MM-DD');
  userData:any='';
  constructor(public api:ApiService,public navctrl:NavController, public route:ActivatedRoute, public component: ComponentServiceService) {
    console.log(this.slotData, "soltss")
    this.userData =JSON.parse(localStorage.getItem('userData'));
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.doctorId = JSON.parse(params.data);
        console.log(this.doctorId)
       }
      })
      this.timeslotForm=new FormGroup({
              appointment_date:new FormControl('',Validators.required),
              note:new FormControl('',Validators.required),
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
    this.tiemArray = {
      'from':data.value,
      'to': this.slotData[i+1].value
    }
console.log(this.tiemArray)
  }
  bookslot(){
    if(!this.timeslotForm.valid){
      this.timeslotForm.markAllAsTouched();
    }else{
      if(this.tiemArray == ''){
        this.component.presentToast('Please select tiem slot.','danger')
      }else{
        var fd = new FormData()
        // getSpecialist() {
          // this.component.presentLoading('symptoms');
          fd.append('user_token', this.userData.token)
          fd.append('doctor_id', this.doctorId)
          fd.append('from', this.tiemArray.from)
          fd.append('to', this.tiemArray.to)
          fd.append('message', this.timeslotForm.value.note)
          fd.append('date', this.timeslotForm.value.appointment_date)
          this.api.post('book_appointment.php', fd).subscribe((res: any) => {
            console.log(res);
            // this.component.dismissLoader('symptoms');
            if (res.status === 'Success') {
              this.component.presentToast(res['message'],'success')
              this.navctrl.back();
              } else {
              this.component.presentToast(res['message'],'danger')

             }
          })
        // }
        // this.navctrl.navigateForward('start/tabs/payment')

      }
    }
  }
}
