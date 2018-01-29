import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
 
//Providers
import { DatabaseProvider } from './../../providers/database/database';
 
 
@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})
export class EditDataPage {
 
 task = {id: 0, name: "", type: "", date: "" };
 
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private databaseprovider: DatabaseProvider,
    public toastCtrl: ToastController) {
      this.getCurrentData(navParams.get("task"));     
  }
  
  getCurrentData(task) {
    this.task.id = task.id;
    this.task.name = task.name;
    this.task.type = task.type;
    this.task.date = task.date;
  }
 
  updateProduct() {
      this.databaseprovider.updateProduct(this.task['id'], this.task['name'], this.task['type'], this.task['date'])
      .then(() => {
        let toast = this.toastCtrl.create({
          message: this.task['name'] + ' tahrirlandi!',
          duration: 3000
        });
        toast.present();
        this.navCtrl.popToRoot();
      })
      .catch(e => console.log(e));
  }
 
}