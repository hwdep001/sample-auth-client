import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { EnvVariable } from '../../environments/env-variable';
import { OauthProvider } from './../../providers/oauth';

import { ReqOauthInfo } from './../../models/ReqOauthInfo';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  public reqOauthInfo: ReqOauthInfo;

  constructor(
    private storage: Storage,
    private events: Events,

    private _oauth: OauthProvider
  ) {
    this.initData();
  }

  initData(): void {
    this.reqOauthInfo = new ReqOauthInfo();
    this.reqOauthInfo.client_id = EnvVariable.client_id;
    this.reqOauthInfo.client_secret = EnvVariable.client_secret;
    this.reqOauthInfo.username = 'user';
    this.reqOauthInfo.password = 'userpass';
  }

  signIn(): void {
    this.reqOauthInfo.grant_type = 'password';

    this._oauth.getOauth(this.reqOauthInfo).then(oauthInfo => {
      this.storage.set('oauthInfo', oauthInfo).then(() => {
        console.log(oauthInfo);
        this.events.publish('user:signInOrOut', oauthInfo);
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
