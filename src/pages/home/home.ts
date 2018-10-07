import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { EnvVariable } from './../../environments/env-variable';
import { AuthProvider } from './../../providers/Auth';

import { TokenInfo } from './../../models/TokenInfo';
import { ReqTokenInfo } from './../../models/ReqTokenInfo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public tokenInfo: TokenInfo;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    
    private _auth: AuthProvider
  ) {
    this.initData();
  }

  initData(): void {    
    this.tokenInfo = null;

    this.storage.get('tokenInfo').then(data => {

      // [test] 로그 삭제
      console.log(data);

      this.tokenInfo = data;
    }).catch(err => {
      alert(err);
    });
  }

  refreshToken(): void {
    let reqTokenInfo = new ReqTokenInfo();
    reqTokenInfo.client_id = EnvVariable.client_id;
    reqTokenInfo.client_secret = EnvVariable.client_secret;
    reqTokenInfo.refresh_token = this.tokenInfo.refresh_token;

    this.tokenInfo = null;
    this._auth.refreshToken(reqTokenInfo).then(tokenInfo => {
      this.storage.set('tokenInfo', tokenInfo).then(() => {
        this.tokenInfo = tokenInfo;
        console.log(tokenInfo);
      }).catch(err => {
        console.log(err);
        alert(JSON.stringify(err));
      });
    }).catch(err => {
      console.log(err);
      alert(JSON.stringify(err));
    });
  }

}
