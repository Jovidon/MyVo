import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ChangeDetectorRef } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  test : any [];
  userin = {name: " ", surname : " "};
  userS = {name: " ", surname : " ", grade: 0};
  use : any;
  key : boolean = false;
  wordcnt: number = 0;
  grade: number [];
  gr : number = 0;
  matches: String[];
  isRecording = false;
  day : string = "";
  ok:boolean = false;
  step : number = 0;
  constructor(public navCtrl: NavController,
     public navParams: NavParams, 
     private databaseprovider : DatabaseProvider,
     private tts: TextToSpeech,
     private speechRecognition: SpeechRecognition,
     private plt: Platform,
     private cd: ChangeDetectorRef) {
    
    this.getWordcnt();
    this.getGrade();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

  timeTable = [
    {
      'Day':'Monday',
      'DayUzb': 'Dushanba',
      'firstPair' : 'Oliy Matematika',
      'firstPairAudithory': '101',
      'firstPairTeacher': 'Yaxshiboyev.M',
      'firstPairType': 'Amaliyot',
      'secondPair': 'Fizika',
      'secondPairAudithory': '201',
      'secondPairTeacher': 'Turniyazov.R',
      'secondPairType': 'maruza',
      'thirdPair': 'C++ da dasturlash',
      'thirdPairAudithory': '301', 
      'thirdPairTeacher': 'Sokiev.T',
      'thirdPairType': 'amaliyot'
    }, 
    
    {
      'Day':'Tuesday',
      'DayUzb': 'Seshanba',
      'firstPair' : 'RMQL',
      'firstPairAudithory': '102',
      'firstPairTeacher': 'Saidov.U',
      'firstPairType': 'Amaliyot',
      'secondPair': 'Fizika',
      'secondPairAudithory': '201',
      'secondPairTeacher': 'Turniyazov.R',
      'secondPairType': 'maruza',
      'thirdPair': 'Metrologiya',
      'thirdPairAudithory': '304', 
      'thirdPairTeacher': 'Qurbaniyazov.A',
      'thirdPairType': 'amaliyot'
    },

    {
      'Day':'Wednesday',
      'DayUzb': 'Chorshanba',
      'firstPair' : 'Oliy Matematika',
      'firstPairAudithory': '101',
      'firstPairTeacher': 'Yaxshiboyev.M',
      'secondPair': 'Fizika',
      'secondPairAudithory': '201',
      'secondPairTeacher': 'Turniyazov.R',
      'secondPairType': 'maruza',
      'thirdPair': 'C++ da dasturlash',
      'thirdPairAudithory': '301', 
      'thirdPairTeacher': 'Sokiev.T',
      'thirdPairType': 'amaliyot'

    },

    {
      'Day':'Thursday',
      'DayUzb': 'Payshanba',
      'firstPair' : 'Oliy Matematika',
      'firstPairAudithory': '101',
      'firstPairTeacher': 'Yaxshiboyev.M',
      'firstPairType': 'Amaliyot',
      'secondPair': 'Fizika',
      'secondPairAudithory': '201',
      'secondPairTeacher': 'Turniyazov.R',
      'secondPairType': 'maruza',
      'thirdPair': 'C++ da dasturlash',
      'thirdPairAudithory': '301', 
      'thirdPairTeacher': 'Sokiev.T',
      'thirdPairType': 'amaliyot'
    },

    {
      'Day':'Friday',
      'DayUzb': 'Juma',
      'firstPair' : 'Oliy Matematika',
      'firstPairAudithory': '101',
      'firstPairTeacher': 'Yaxshiboyev.M',
      'firstPairType': 'Amaliyot',
      'secondPair': 'Fizika',
      'secondPairAudithory': '201',
      'secondPairTeacher': 'Turniyazov.R',
      'secondPairType': 'maruza',
      'thirdPair': 'C++ da dasturlash',
      'thirdPairAudithory': '301', 
      'thirdPairTeacher': 'Sokiev.T',
      'thirdPairType': 'amaliyot'

    },

    {
      'Day':'Saturday',
      'DayUzb': 'Shanba',
      'firstPair' : 'Oliy Matematika',
      'firstPairAudithory': '101',
      'firstPairTeacher': 'Yaxshiboyev.M',
      'firstPairType': 'Amaliyot',
      'secondPair': 'Fizika',
      'secondPairAudithory': '201',
      'secondPairTeacher': 'Turniyazov.R',
      'secondPairType': 'maruza',
      'thirdPair': 'C++ da dasturlash',
      'thirdPairAudithory': '301', 
      'thirdPairTeacher': 'Sokiev.T',
      'thirdPairType': 'amaliyot'

    }
  ]
    

  

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
  
  getGrade(){
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if(rdy) {
        this.databaseprovider.getGrade().then ( data => {
          if(data.length > 0 ){
          this.grade = data;
             this.gr = this.grade['mark'];
          }
        })
      } 
    })
  }
  
  Speak() {
    this.tts.speak('Hello  World')
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


}
