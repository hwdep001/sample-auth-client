import { ReqJwt } from './../../models/ReqJwt';
import { Jwt } from './../../models/Jwt';
import { OauthProvider } from './../../providers/oauth/oauth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private reqIp: String;
  private reqJwt: ReqJwt = new ReqJwt();
  private jwt: Jwt;

  constructor(
    public navCtrl: NavController,
    private _oauth: OauthProvider,
    private storage: Storage
  ) {
    this.reqIp = '192.168.0.251';
    
    this.reqJwt.client_id = 'client1';
    this.reqJwt.client_secret = 'client1pass';
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

  getJWT(grantType: String): void {
    this.reqJwt.grant_type = grantType;

    if(grantType == 'refresh_token') {

      if(this.jwt == null) {
        return null;
      } else {
        this.reqJwt.refresh_token = this.jwt.refresh_token;
      }
    }

    this.jwt = null;
    this._oauth.getJWT(this.reqIp, this.reqJwt).then(jwt => {
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
