import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ComponentServiceService {

  constructor(public alert:AlertController,public toastController:ToastController,public loadingController:LoadingController) {

   }

  async presentAlert(msg)
   {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: msg,
      mode:'ios',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(msg,color) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color:color
    });
    toast.present();
  }


 async alertButtons(header,msg)
  {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: header,
      message: msg,
      mode:'ios',
      buttons:[{text:'No',
    role:'close'},
  {
    text:'Yes',
    handler:()=>{
      this.presentToast('Comming Soon','danger')
    }
  }]
    });

    await alert.present();

  }

  async presentLoading(id) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      backdropDismiss:false,
      translucent:true,
      id:id
    });
    await loading.present();
  }

  dismissLoader(id)
  {
    this.loadingController.dismiss('','',id);
  }




   
}
