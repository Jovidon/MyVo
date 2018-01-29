import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeechTestPage } from './speech-test';

@NgModule({
  declarations: [
    SpeechTestPage,
  ],
  imports: [
    IonicPageModule.forChild(SpeechTestPage),
  ],
})
export class SpeechTestPageModule {}
