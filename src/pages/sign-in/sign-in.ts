import { Component } from '@angular/core';

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
      alert(err.code + ": " + err.data);
    });
  }

}
