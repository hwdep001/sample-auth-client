import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { EnvVariable } from './../../environments/env-variable';
import { OauthProvider } from '../../providers/oauth';

import { OauthInfo } from '../../models/OauthInfo';
import { ReqOauthInfo } from '../../models/ReqOauthInfo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public reqOauthInfo: ReqOauthInfo;
  public oauthInfo: OauthInfo;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    
    private _oauth: OauthProvider
  ) {
    this.initData();
  }

  initData(): void {
    this.reqOauthInfo = new ReqOauthInfo();
    this.reqOauthInfo.username = 'user';
    this.reqOauthInfo.password = 'userpass';
    
    this.oauthInfo = null;

    this.storage.get('oauthInfo').then(data => {
      this.oauthInfo = data;
    }).catch(err => {
      alert(err);
    });
  }

  getOauth(grantType: string): void {
    this.reqOauthInfo.client_id = EnvVariable.client_id;
    this.reqOauthInfo.client_secret = EnvVariable.client_secret;
    this.reqOauthInfo.grant_type = grantType;

    if(grantType == 'refresh_token') {

      if(this.oauthInfo == null) {
        return null;
      } else {
        this.reqOauthInfo.refresh_token = this.oauthInfo.refresh_token;
      }
    }

    this.oauthInfo = null;
    this._oauth.getOauth(this.reqOauthInfo).then(oauthInfo => {
      this.storage.set('oauthInfo', oauthInfo).then(() => {
        console.log(oauthInfo);
        this.oauthInfo = oauthInfo;
      }).catch(err => {
        console.log(err);
        alert(err);
      });
    }).catch(err => {
      console.log(err);
      alert(err);
    });
  }

  clearOauth(): void {
    this.storage.remove('oauthInfo').then(() => {
      this.oauthInfo = null;
    }).catch(err => {
      alert(err);
    });
  }

}
