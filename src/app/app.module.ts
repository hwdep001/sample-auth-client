import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PipesModule } from './PipesModule';

// import { RequestInterceptorService } from './../providers/RequestInterceptor';
import { CommonProvider } from './../providers/Common';
import { AuthProvider } from './../providers/Auth';
import { UserProvider } from './../providers/User';
import { ItemProvider } from './../providers/Item';

import { SignInPage } from './../pages/sign-in/sign-in';
import { SignUpPage } from './../pages/sign-up/sign-up';
import { HomePage } from './../pages/home/home';
import { MyInfoPage } from './../pages/my-info/my-info';

@NgModule({
  declarations: [
    MyApp,
    SignInPage,
    SignUpPage,
    HomePage,
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
    SignUpPage,
    HomePage,
    MyInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true },
    CommonProvider,
    AuthProvider,
    UserProvider,
    ItemProvider
  ]
})
export class AppModule {}
