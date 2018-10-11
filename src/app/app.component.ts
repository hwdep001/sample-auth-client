import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { SignInPage } from './../pages/sign-in/sign-in';
import { HomePage } from './../pages/home/home';
import { ListPage } from './../pages/list/list';
import { MyInfoPage } from './../pages/my-info/my-info';

import { TokenInfo } from './../models/TokenInfo';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public rootPage: any = null;
  public isSignedIn: boolean = false;
  public pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private events: Events,
    private storage: Storage
  ) {
    this.initializeApp();

    this.events.subscribe('user:signInOrOut', (tokenInfo: TokenInfo) => {
      this.initializePage(tokenInfo);
    });

    this.storage.get('tokenInfo').then((tokenInfo: TokenInfo) => {
      this.initializePage(tokenInfo);
    });
  }

  initializeApp(): void {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initializePage(tokenInfo: TokenInfo): void {

    if(tokenInfo == null) {
      this.setRootPage(true);
      this.isSignedIn = false;
      this.pages = [
        { title: 'Sign In', component: SignInPage }
      ];
    } else {
      this.setRootPage(false);
      this.isSignedIn = true;
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'List', component: ListPage },
        { title: 'My info', component: MyInfoPage }
      ];
    }
  }

  setRootPage(goSignInPage: boolean): void {
    this.rootPage = (goSignInPage == true ? SignInPage : HomePage);
  }

  openPage(page): void {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
