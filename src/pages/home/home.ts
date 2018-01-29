import { Component } from '@angular/core';
import { NavController, ToastController, Platform , AlertController} from 'ionic-angular';
import { FormControl } from '@angular/forms';
import {AddtaskPage} from '../addtask/addtask';
import { ViewDataPage } from './../view-data/view-data';
import { EditDataPage } from './../edit-data/edit-data';
import { TestPage } from './../test/test'; 
import { ResultPage } from './../result/result';
import { MainTestPage } from './../main-test/main-test';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';


 
//Providers
import { DatabaseProvider } from './../../providers/database/database';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchTerm: String = '';
  searchControl: FormControl;
  searching: any = false;

  task: any = [];

  matches: String[];
  isRecording = false;
 
  constructor(
    public navCtrl : NavController,
    private databaseprovider: DatabaseProvider,
    private toastCtrl :ToastController,
    private localNotifications : LocalNotifications,
    private platform : Platform,
    private alertCtrl : AlertController,
    private tts: TextToSpeech,
    private speechRecognition: SpeechRecognition,
    private plt: Platform,
    private cd: ChangeDetectorRef,
    private keyBoar: Keyboard
   ) {
    this.searchControl = new FormControl();
    this.getData();
    this.platform.ready().then(() => {
      this.localNotifications.on('click', (noti, state) => {
        this.alertCtrl.create({
          title : state,
          subTitle : noti
        }).present();
      });
    });
    this.pushNoti();
    this.getPermission();

  }
 
  ionViewWillEnter() {
    this.getData();
  }
  ionViewDidLoad() {
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.setFilteredItems();
    });
    
  }
 
  onSearchInput() {
     this.searching = true;
  }
 
  setFilteredItems() {
      this.task = this.databaseprovider.filterItems(this.searchTerm);
  }
  goToAdd(){
    this.navCtrl.push(AddtaskPage);

  }
  viewProduct(task) {
    this.navCtrl.push(ViewDataPage, {
      task: task
    });
  }
  editProduct(task) {
    this.navCtrl.push(EditDataPage, {
      task: task
    });
  }
  deleteProduct(product) {
    let msg = product.name;
    this.databaseprovider.deleteProduct(product.id)
    .then(() => {
      let toast = this.toastCtrl.create({
        message: msg + " o'chirildi!",
        duration: 3000
      });
      toast.present();
      this.getData();
    })
    .catch(e => console.log(e));
  }
 
  getData() {
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
      this.databaseprovider.getAllProducts().then(data => {
          this.task = data;
        });
      }
    })
  }
  goToTest(){
    this.navCtrl.push(MainTestPage);
  }

  goToResultPage () {
    this.navCtrl.push(ResultPage);
  }
  
  pushNoti() {
    this.platform.ready().then(() => {
      this.localNotifications.schedule( {
        id : 1,
        title : 'MeLu notification',
        text : 'Be modest and creative',
        at: new Date(new Date().getTime() + 3 * 1000),
        data :  { "id" : 1, "name" : "John"}
      });
    });
  }
  speakSentence(word){
    this.tts.speak(word)
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));

  }

  isIos() {
    return this.plt.is('ios');
  }
 
  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }
 
  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }
 
  startListening() {
    /*let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
    

     for (let a of this.matches)
     if(a!="f***"||a!="f****"||a!="f*****")
            this.searchTerm = this.searchTerm +  a.toString() ;

    this.stopListening();
    this.onSearchInput();
    if(this.searchTerm !=' '||this.searchTerm != ''){
      this.setFilteredItems();
      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
          this.searching = false;
          this.setFilteredItems();
      });
       this.matches = [];
  }*/
  let tst = this.toastCtrl.create({
    message:"Please click mic key on keyboard in order to search.",
    duration : 3000,
    position : 'middle'
  })
  tst.present();
  this.speakSentence("Please click mic key on keyboard in order to search");
  this.keyBoar.show();

  }
}