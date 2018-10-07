import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { EnvVariable } from './../environments/env-variable';

import { ResponseDate } from './../models/ResponseDate';
import { TokenInfo } from './../models/TokenInfo';
import { ReqTokenInfo } from './../models/ReqTokenInfo';
import { JwtInfo } from './../models/JwtInfo';

@Injectable()
export class AuthProvider {

  private reqUrl: string = null;

  constructor(
    private http: HttpClient,
    private events: Events,
    private storage: Storage
  ) {
    this.reqUrl = EnvVariable.resource_server_url;
  }

  async getJwtInfo() {
    let jwtInfo = new JwtInfo();

    const tokenInfo = await this.storage.get('tokenInfo');

    if(tokenInfo != null) {
      const payload = tokenInfo.access_token.split('.')[1];
      const decodedPayload = window.atob(payload);
      jwtInfo = JSON.parse(decodedPayload) as JwtInfo;
    }

    return jwtInfo;
  }

  signIn(reqTokenInfo: ReqTokenInfo): Promise<TokenInfo> {
    return new Promise<TokenInfo>((resolve, reject) => {

      reqTokenInfo.grant_type = 'password';

      return this.getToken(reqTokenInfo).then(tokenInfo => {
        this.storage.set('tokenInfo', tokenInfo).then(() => {
          this.events.publish('user:signInOrOut', tokenInfo);
          resolve(tokenInfo);
        }).catch(err => {
          reject(err);
        });
      }).catch(err => {
        reject(err);
      });
    });
  }

  signOut(): void {
    this.storage.remove('tokenInfo').then(() => {
      this.events.publish('user:signInOrOut', null);
    }).catch(err => {
      console.log(err);
      alert(err);
    });
  }

  refreshToken(reqTokenInfo: ReqTokenInfo): Promise<TokenInfo> {
    return new Promise<TokenInfo>((resolve, reject) => {

      // [test] 아래 2줄 삭제
      reqTokenInfo.client_id = EnvVariable.client_id;
      reqTokenInfo.client_secret = EnvVariable.client_secret;

      reqTokenInfo.grant_type = 'refresh_token';

      return this.getToken(reqTokenInfo).then(tokenInfo => {
        this.storage.set('tokenInfo', tokenInfo).then(() => {
          resolve(tokenInfo);
        }).catch(err => {
          reject(err);
        });
      }).catch(err => {
        reject(err);
      });
    });
  }

  /**
   * Get new or refresh token info.
   * @param reqTokenInfo 
   */
  private getToken(reqTokenInfo: ReqTokenInfo): Promise<TokenInfo> {
    return new Promise<TokenInfo>((resolve, reject) => {

      // [test] 주석 풀어야 함
      // reqTokenInfo.client_id = EnvVariable.client_id;
      // reqTokenInfo.client_secret = EnvVariable.client_secret;
      const reqData = reqTokenInfo;

      this.http.post(`${this.reqUrl}/oauth/token`, reqData, {})
      .subscribe(data => {
        const resData = data as ResponseDate;

        if(resData.res == true) {
          resolve(resData.data as TokenInfo);
        } else {
          const msg: string = resData.code + ": " + resData.msg;
          reject(msg);
        }

      }, err => {
        reject(err);
      });
    });
  }

}
