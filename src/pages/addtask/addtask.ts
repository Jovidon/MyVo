import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-addtask',
  templateUrl: 'addtask.html',
})
export class AddtaskPage {
  task = { name:"", type:"", date:"" };
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private databaseprovider: DatabaseProvider,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtaskPage');
  }
  addProduct() {
    let msg = this.task['name'];

    this.databaseprovider.addProduct(this.task['name'], this.task['type'], this.task['date'])
    .then(() => {
      let toast = this.toastCtrl.create({
        message: msg + ' qushildi!',
        duration: 3000
      });
      toast.present();
    })
    .catch( e => console.log(e));

    this.task = { name: "", type: "", date: "" };
    this.navCtrl.pop();

  }

}
