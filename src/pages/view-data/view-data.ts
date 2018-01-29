import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
 
@Component({
  selector: 'page-view-data',
  templateUrl: 'view-data.html',
})
export class ViewDataPage {
  
  task = { name: "", type:"", date: "" };
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private tts: TextToSpeech,
    private toastCtrl : ToastController) {
      this.getCurrentData(navParams.get("task"));   
  }
 
  getCurrentData(task) {
    this.task.name = task.name;
    this.task.type = task.type;
    this.task.date = task.date;
  }

  Speak(){
    this.tts.speak(this.task.name)
  .then(() => console.log('Success'))
  .catch((reason: any) => console.log(reason));
  }

  speakSentence(){
    this.tts.speak(this.task.date)
  .then(() => console.log('Success'))
  .catch((reason: any) => console.log(reason));
  }
 
}