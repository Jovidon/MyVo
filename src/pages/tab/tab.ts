import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from './../home/home';
import { HeadPage } from './../head/head';


@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {
  tab1 : any;
  tab2 : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab2 = HomePage;
    this.tab1 = HeadPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabPage');
  }

  
}
