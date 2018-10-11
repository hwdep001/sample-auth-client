import { Component } from '@angular/core';

import { EnvVariable } from './../../environments/env-variable';
import { AuthProvider } from './../../providers/Auth';
import { CommonProvider } from './../../providers/Common';

import { ReqTokenInfo } from './../../models/ReqTokenInfo';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  public reqTokenInfo: ReqTokenInfo;

  constructor(
    private authService: AuthProvider,
    private cmnService: CommonProvider
  ) {
    this.initData();
  }

  initData(): void {
    this.reqTokenInfo = new ReqTokenInfo();
    this.reqTokenInfo.clientId = EnvVariable.clientId;
    this.reqTokenInfo.clientSecret = EnvVariable.clientSecret;
    this.reqTokenInfo.username = 'user';
    this.reqTokenInfo.password = 'userpass';
  }

  signIn(): void {
    const loader = this.cmnService.getLoader(null, 30000, true);
    loader.present();

    this.authService.signIn(this.reqTokenInfo).then(tokenInfo => {
    }).catch(err => {
      loader.dismiss();
      console.log(err);
      alert(JSON.stringify(err));
    });
  }

}
