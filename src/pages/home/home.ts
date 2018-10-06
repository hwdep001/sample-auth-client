import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { OauthProvider } from '../../providers/oauth';

import { Jwt } from './../../models/Jwt';
import { ReqJwt } from './../../models/ReqJwt';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public reqJwt: ReqJwt = new ReqJwt();
  public jwt: Jwt;

  constructor(
    public navCtrl: NavController,
    private _oauth: OauthProvider,
    private storage: Storage
  ) {
    this.reqJwt.username = 'user';
    this.reqJwt.password = 'userpass';
    
    this.jwt = null;
    
    this.initData();
  }

  initData(): void {
    this.storage.get('jwt').then(data => {
      this.jwt = data;
    }).catch(err => {
      alert(err);
    });
  }

  getJWT(grantType: string): void {
    this.reqJwt.grant_type = grantType;

    if(grantType == 'refresh_token') {

      if(this.jwt == null) {
        return null;
      } else {
        this.reqJwt.refresh_token = this.jwt.refresh_token;
      }
    }

    this.jwt = null;
    this._oauth.getJWT(this.reqJwt).then(jwt => {
      this.storage.set('jwt', jwt).then(() => {
        console.log(jwt);
        this.jwt = jwt;
      }).catch(err => {
        console.log(err);
        alert(err);
      });
    }).catch(err => {
      console.log(err);
      alert(err);
    });
  }

  clearJWT(): void {
    this.storage.remove('jwt').then(() => {
      this.jwt = null;
    }).catch(err => {
      alert(err);
    });
  }

}
