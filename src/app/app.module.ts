import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AddtaskPage} from '../pages/addtask/addtask';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';
import { ViewDataPage } from '../pages/view-data/view-data';
import { EditDataPage } from '../pages/edit-data/edit-data';
import { TestPage } from './../pages/test/test';
import { TabPage } from './../pages/tab/tab';
import { HeadPage } from './../pages/head/head';
import { SignupPage } from './../pages/signup/signup';
import { ResultPage } from './../pages/result/result';
import { MainTestPage } from './../pages/main-test/main-test';
import { SpeechTestPage } from './../pages/speech-test/speech-test';

import { SQLite } from '@ionic-native/sqlite';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { PhonePage } from './../pages/phone/phone';
import { Keyboard } from '@ionic-native/keyboard';
import { from } from 'rxjs/observable/from';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddtaskPage,
    ViewDataPage,
    EditDataPage,
    TestPage,
    TabPage,
    HeadPage,
    SignupPage,
    ResultPage,
    PhonePage,
    MainTestPage,
    SpeechTestPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddtaskPage,
    ViewDataPage,
    EditDataPage,
    TestPage,
    TabPage,
    HeadPage,
    SignupPage,
    ResultPage,
    PhonePage,
    MainTestPage,
    SpeechTestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    SQLite,
    LocalNotifications,
    TextToSpeech,
    SpeechRecognition,
    Keyboard
  ]
})
export class AppModule {}
