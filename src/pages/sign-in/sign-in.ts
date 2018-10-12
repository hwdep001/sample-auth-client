import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignUpPage } from './../sign-up/sign-up';

import { CommonProvider } from './../../providers/Common';
import { AuthProvider } from './../../providers/Auth';

import { ResponseData } from './../../models/ResponseData';
import { ReqTokenInfo } from './../../models/ReqTokenInfo';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  public reqTokenInfo: ReqTokenInfo = new ReqTokenInfo();

  constructor(
    private navCtrl: NavController,
    private authService: AuthProvider,
    private cmnService: CommonProvider
  ) {
    this.initData();
  }

  initData(): void {
    this.reqTokenInfo.username = 'user';
    this.reqTokenInfo.password = 'userpass';
  }

  signIn(): void {
    const loader = this.cmnService.getLoader(null, 30000, true);
    loader.present();

    this.authService.signIn(this.reqTokenInfo).then(tokenInfo => {
    }).catch((err: ResponseData) => {
      loader.dismiss();
      alert(err.code + ": " + err.msg);
    });
  }

  moveToSignUp(): void {
    this.navCtrl.push(SignUpPage);
  }

}
