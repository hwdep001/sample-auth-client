import { Component } from '@angular/core';

import { EnvVariable } from './../../environments/env-variable';
import { AuthProvider } from './../../providers/Auth';

import { ReqTokenInfo } from './../../models/ReqTokenInfo';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  public reqTokenInfo: ReqTokenInfo;

  constructor(
    private _auth: AuthProvider
  ) {
    this.initData();
  }

  initData(): void {
    this.reqTokenInfo = new ReqTokenInfo();
    this.reqTokenInfo.client_id = EnvVariable.client_id;
    this.reqTokenInfo.client_secret = EnvVariable.client_secret;
    this.reqTokenInfo.username = 'user';
    this.reqTokenInfo.password = 'userpass';
  }

  signIn(): void {
    this._auth.signIn(this.reqTokenInfo).then(tokenInfo => {
    }).catch(err => {
      console.log(err);
      alert(JSON.stringify(err));
    });
  }

}
