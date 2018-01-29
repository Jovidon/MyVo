import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { DatabaseProvider } from './../../providers/database/database';
import { Location } from '@angular/common';
import { HomePage } from './../home/home';


@IonicPage()
@Component({
  selector: 'page-head',
  templateUrl: 'head.html',
})
export class HeadPage {
  test : any [];
  userin = {name: " ", surname : " "};
  userS = {name: " ", surname : " ", grade: 0};
  use : any;
  key : boolean = false;
  wordcnt: number = 0;

  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     private databaseprovider : DatabaseProvider,
     public toastCtrl :ToastController,
     private location: Location) {
   this.getUser();
   this.getWordcnt();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeadPage');
  }

  getUser() {
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
      this.databaseprovider.getUser().then(data => {
            
        this.test = data;
          if(this.test.length > 0){
              this.key = true
          }
        });
      }
    })
  }
  load() {
    location.reload()
    }

  addUser(){
    this.databaseprovider.addUser(this.userin['name'],this.userin['surname']).then(() => {
      let toast = this.toastCtrl.create({
        message: this.userin['name'] + ' qushildi!',
        duration: 3000
      });
      toast.present();
    })
    .catch( e => console.log(e));
    this.userin = {name: " ",surname: " "};
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }


  getWordcnt(){
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if(rdy) {
        this.databaseprovider.getAllProducts().then ( data => {
          if(data.length > 0 )
          this.wordcnt = data.length;
          else 
          this.wordcnt = 0;
        })
      }
    })
  }
  

  

}
