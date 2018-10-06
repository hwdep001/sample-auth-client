import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { OauthProvider } from './../../providers/oauth';

import { ReqJwt } from './../../models/ReqJwt';
import { EnvVariable } from '../../environments/env-variable';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  public reqJwt: ReqJwt = new ReqJwt();

  constructor(
    private storage: Storage,
    private events: Events,

    private _oauth: OauthProvider
  ) {
    this.initData();
  }

  initData(): void {
    this.reqJwt.client_id = EnvVariable.client_id;
    this.reqJwt.client_secret = EnvVariable.client_secret;
    this.reqJwt.username = 'user';
    this.reqJwt.password = 'userpass';
  }

  signIn(): void {
    this.reqJwt.grant_type = 'password';

    this._oauth.getJWT(this.reqJwt).then(jwt => {
      this.storage.set('jwt', jwt).then(() => {
        console.log(jwt);
        this.events.publish('user:signInOrOut', jwt);
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
