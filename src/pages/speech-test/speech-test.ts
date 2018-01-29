import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform , ToastController} from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-speech-test',
  templateUrl: 'speech-test.html',
})
export class SpeechTestPage {
  task : any [];
  rand : number;
  que : string;
  matches: String[];
  isRecording = false;
  day : string = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private database :DatabaseProvider,
    private speechRecognition: SpeechRecognition,
    private plt: Platform,
    private cd: ChangeDetectorRef,
    private toastCtrl : ToastController) {
    this.getData();
    this.rand = Math.round(Math.random()*100);
    this.getPermission();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeechTestPage');
  }

  getData(){

    this.database.getDatabaseState().subscribe(rdy => {
      if(rdy){
        this.database.getAllProducts().then(data => {
          this.task = data;
          this.rand = (this.rand) % (this.task.length);
          this.que = this.task[this.rand].type;
        });
      }
    })
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
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches;
      this.cd.detectChanges();
    });
    this.isRecording = true;
    let t :string;
    for (let word of this.matches){
      if (word !=" "&&word!=""){
        this.day = word.toString();
      }
    }
  }

  checkTest(){
    if(this.day.toLowerCase() == this.task[this.rand].name.toLowerCase())
    {
     let toast = this.toastCtrl.create( {
       message : "Correct!",
       duration : 2000,
       position : 'middle'
     });
     toast.present();
     this.navCtrl.pop();
    }
    else 
    {
      let toast = this.toastCtrl.create( {
        message : "Incorrect! Please try again! " + this.day +" ok",
        duration : 2000,
        position : 'middle'
      });
      toast.present();
  
    }
  }

}
