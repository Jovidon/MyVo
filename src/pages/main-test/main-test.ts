import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TestPage } from './../test/test';
import { SpeechTestPage } from './../speech-test/speech-test';
import { from } from 'rxjs/observable/from';

@IonicPage()
@Component({
  selector: 'page-main-test',
  templateUrl: 'main-test.html',
})
export class MainTestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainTestPage');
  }

  goToWritingTest() {
    this.navCtrl.push(TestPage);
  }

  goToSpeechTest() {
    this.navCtrl.push(SpeechTestPage);
  }
}
