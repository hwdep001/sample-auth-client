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
    private _auth: AuthProvider,
    private _cmn: CommonProvider
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
    const loader = this._cmn.getLoader(null, 30000, true);
    loader.present();

    this._auth.signIn(this.reqTokenInfo).then(tokenInfo => {
    }).catch(err => {
      console.log(err);
      alert(JSON.stringify(err));
    });
  }

}
