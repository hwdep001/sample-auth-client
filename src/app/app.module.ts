import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './PipesModule';

import { AuthProvider } from './../providers/Auth';
import { CommonProvider } from '../providers/Common';

import { SignInPage } from './../pages/sign-in/sign-in';
import { HomePage } from './../pages/home/home';
import { ListPage } from './../pages/list/list';
import { MyInfoPage } from './../pages/my-info/my-info';

@NgModule({
  declarations: [
    MyApp,
    SignInPage,
    HomePage,
    ListPage,
    MyInfoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignInPage,
    HomePage,
    ListPage,
    MyInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    CommonProvider
  ]
})
export class AppModule {}
