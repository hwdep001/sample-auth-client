import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { EnvVariable } from './../../environments/env-variable';
import { TokenProvider } from '../../providers/Token';

import { TokenInfo } from '../../models/TokenInfo';
import { ReqTokenInfo } from '../../models/ReqTokenInfo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public reqTokenInfo: ReqTokenInfo;
  public tokenInfo: TokenInfo;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    
    private _token: TokenProvider
  ) {
    this.initData();
  }

  initData(): void {
    this.reqTokenInfo = new ReqTokenInfo();
    this.reqTokenInfo.username = 'user';
    this.reqTokenInfo.password = 'userpass';
    
    this.tokenInfo = null;

    this.storage.get('tokenInfo').then(data => {
      this.tokenInfo = data;
    }).catch(err => {
      alert(err);
    });
  }

  getToken(grantType: string): void {
    this.reqTokenInfo.client_id = EnvVariable.client_id;
    this.reqTokenInfo.client_secret = EnvVariable.client_secret;
    this.reqTokenInfo.grant_type = grantType;

    if(grantType == 'refresh_token') {

      if(this.tokenInfo == null) {
        return null;
      } else {
        this.reqTokenInfo.refresh_token = this.tokenInfo.refresh_token;
      }
    }

    this.tokenInfo = null;
    this._token.getToken(this.reqTokenInfo).then(tokenInfo => {
      this.storage.set('tokenInfo', tokenInfo).then(() => {
        console.log(tokenInfo);
        this.tokenInfo = tokenInfo;
      }).catch(err => {
        console.log(err);
        alert(err);
      });
    }).catch(err => {
      console.log(err);
      alert(err);
    });
  }

  clearToken(): void {
    this.storage.remove('tokenInfo').then(() => {
      this.tokenInfo = null;
    }).catch(err => {
      alert(err);
    });
  }

}
