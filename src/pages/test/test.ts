import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

import { TextToSpeech } from '@ionic-native/text-to-speech';

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

 task : any [];
 test : any [];
 grade :number [];
 eng : string;
 uzb : string;
 key : boolean = false;
 ans : string;
 k : number = 0;  
 que : string;
 rand : number;
 user: string;
 usetf: string;
 gr : number = 0;
 getvalue : string = "salom aleykum";
 value = {name : "Jovid", surname: "Xamrokulov"};

 constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private databaseprovider: DatabaseProvider,
   public toastCtrl: ToastController,
   private tts : TextToSpeech) 
   { 
     this.getData();
     this.rand = Math.round(Math.random()*100);
     this.getUser();
     console.log(this.rand);
          

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  getData() {
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
      this.databaseprovider.getAllProducts().then(data => {
          this.task = data;
          this.rand = (this.rand)%(this.task.length);
          this.que = this.task[this.rand].name;
        });
      }
    })
  }
  
  getUser() {
    this.databaseprovider.getDatabaseState().subscribe(rdy => {
      if (rdy) {
      this.databaseprovider.getUser().then(data => {
          this.test = data;
        });
      }
    })
  }
  
  getGrade() {
    this.databaseprovider.getDatabaseState().subscribe( rdy => {
      if (rdy){
        this.databaseprovider.getGrade().then(data => {
        this.grade = data;
        this.gr = this.grade['mark'];
        
        })
      }
    })
  }

  

  startTest(){
   
    let toast = this.toastCtrl.create({
      message:  this.task[this.rand].type[0]+" -birinchi harf. Sizga yordam!",
      duration: 3000,
      position : 'top'
    });
    toast.present();
    this.key = true;

  }

  submitTest(){
    if(this.ans.toLowerCase() == this.task[this.rand].type.toLowerCase())
     {
       this.databaseprovider.updateGrade(this.gr+1);
      let toast = this.toastCtrl.create({
        message: " Correct!",
        duration: 2000,
        position : 'middle',
      });
      toast.present();
      this.tts.speak('Correct')
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
    this.navCtrl.pop();
    
     }
     else
     {
       let toast = this.toastCtrl.create({
         message : " Incorrect. Please try again!",
         duration : 2000,
         position : 'middle',
       });
       toast.present();
       this.tts.speak('Incorrect. Please try again')
       .then(() => console.log('Success'))
       .catch((reason: any) => console.log(reason));

     }
     
  }
  
  getValue(value) {
    console.log(value);
  }

}
