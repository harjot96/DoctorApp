import { Component, OnInit } from '@angular/core';
import { ComponentServiceService } from '../component-service.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-appointment-list2',
  templateUrl: './appointment-list2.page.html',
  styleUrls: ['./appointment-list2.page.scss'],
})
export class AppointmentList2Page implements OnInit {
  fd = new FormData();
  symptomData: any = [];
  data:any=[];
  userData: any = '';
  noData:boolean=false;
  constructor(public api:ApiService,public component:ComponentServiceService) { 
    this.userData = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getData();
  }
  accept(){
// this.component.presentAlert('Lorem Ipsum is simply dummy text').then()
this.component.presentToast('Lorem Ipsum is simply dummy text','success')
}



  decline()
  {
    this.component.presentAlert('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry')

  }
  getData() {
    this.fd.append('user_token', this.userData.token)
    this.api.post('appointments_list.php', this.fd).subscribe((res: any) => {
      console.log(res);
      this.noData =true;
     if (res.status === 'Success') {
        this.data = res.data;
      } else {
        this.data = [];
      }
    })
  }
}
