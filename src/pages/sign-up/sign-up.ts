import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignInPage } from './../sign-in/sign-in';

import { CommonProvider } from '../../providers/Common';
import { UserProvider } from '../../providers/User';

import { ResponseData } from '../../models/ResponseData';
import { UserRegInfo } from '../../models/UserRegInfo';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  public user: UserRegInfo = new UserRegInfo();

  constructor(
    private navCtrl: NavController,
    private cmnService: CommonProvider,
    private userService: UserProvider
  ) {
    this.initData();
  }

  initData(): void {
    this.user.username = 'user100';
    this.user.password = 'userpass';
    this.user.email = this.user.username + "@email.com";
    this.user.phoneNumber = '01099990100';
  }

  signUp(): void {
    const loader = this.cmnService.getLoader(null, 30000, true);
    loader.present();

    this.userService.signUp(this.user).then(() => {
      this.navCtrl.setRoot(SignInPage);
      loader.dismiss();
    }).catch((err: ResponseData) => {
      loader.dismiss();
      alert(err.code + ": " + err.msg);
    });
  }

}
