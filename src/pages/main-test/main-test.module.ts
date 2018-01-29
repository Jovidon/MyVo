import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainTestPage } from './main-test';

@NgModule({
  declarations: [
    MainTestPage,
  ],
  imports: [
    IonicPageModule.forChild(MainTestPage),
  ],
})
export class MainTestPageModule {}
