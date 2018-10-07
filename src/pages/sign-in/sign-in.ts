import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { EnvVariable } from '../../environments/env-variable';
import { TokenProvider } from '../../providers/Token';

import { ReqTokenInfo } from '../../models/ReqTokenInfo';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  public reqTokenInfo: ReqTokenInfo;

  constructor(
    private storage: Storage,
    private events: Events,

    private _token: TokenProvider
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
    this.reqTokenInfo.grant_type = 'password';

    this._token.getToken(this.reqTokenInfo).then(tokenInfo => {
      this.storage.set('tokenInfo', tokenInfo).then(() => {
        console.log(tokenInfo);
        this.events.publish('user:signInOrOut', tokenInfo);
      }).catch(err => {
        console.log(err);
        alert(err);
      });
    }).catch(err => {
      console.log(err);
      alert(err);
    });
  }

}
