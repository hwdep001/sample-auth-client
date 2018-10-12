import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { EnvVariable } from './../environments/env-variable';

import { ResponseData } from './../models/ResponseData';
import { TokenInfo } from './../models/TokenInfo';
import { ReqTokenInfo } from './../models/ReqTokenInfo';
import { JwtInfo } from './../models/JwtInfo';

@Injectable()
export class AuthProvider {

  private reqAuthUrl: string;

  constructor(
    private http: HttpClient,
    private events: Events,
    private storage: Storage,
  ) {
    this.reqAuthUrl = EnvVariable.authServerUrl;
  }

  async getJwtInfo(): Promise<JwtInfo> {
    let jwtInfo = null;
    const tokenInfo: TokenInfo = await this.storage.get('tokenInfo');

    if(tokenInfo != null) {
      const payload = tokenInfo.accessToken.split('.')[1];
      const decodedPayload = window.atob(payload);
      jwtInfo = JwtInfo.fromData(decodedPayload);
    }

    return jwtInfo;
  }

  async getAccessToken(): Promise<string> {
    const tokenInfo: TokenInfo = await this.storage.get('tokenInfo');
    return tokenInfo.accessToken;
  }

  async getRefreshToken(): Promise<string> {
    const tokenInfo: TokenInfo = await this.storage.get('tokenInfo');
    return tokenInfo.refreshToken;
  }

  async getBearerAuthorization(): Promise<string> {
    return 'Bearer ' + await this.getAccessToken();
  }

  private getBasicAuthorization(): string {
    return 'Basic ' + btoa(EnvVariable.clientId + ":" + EnvVariable.clientSecret);
  }

  signIn(reqTokenInfo: ReqTokenInfo): Promise<TokenInfo> {
    return new Promise<TokenInfo>((resolve, reject) => {

      reqTokenInfo.grantType = 'password';

      return this.getToken(reqTokenInfo).then(tokenInfo => {
        this.storage.set('tokenInfo', tokenInfo).then(() => {
          this.events.publish('user:signInOrOut', tokenInfo);
          this.events.publish('tokenInfo:set', tokenInfo);
          resolve(tokenInfo);
        }).catch(() => {
          reject(ResponseData.fromCodeAndData(-1, 'Failed to save token info.'));
        });
      }).catch((err:ResponseData) => {
        reject(err);
      });
    });
  }

  signOut(): void {
    this.storage.remove('tokenInfo').then(() => {
      this.events.publish('user:signInOrOut', null);
    });
  }

  async refreshToken(): Promise<TokenInfo> {
    let reqTokenInfo = new ReqTokenInfo();
    reqTokenInfo.grantType = 'refresh_token';
    reqTokenInfo.refreshToken = await this.getRefreshToken();

    return new Promise<TokenInfo>((resolve, reject) => {
      return this.getToken(reqTokenInfo).then(tokenInfo => {
        this.storage.set('tokenInfo', tokenInfo).then(() => {
          this.events.publish('tokenInfo:set', tokenInfo);
          resolve(tokenInfo);
        }).catch(() => {
          reject(ResponseData.fromCodeAndData(-1, 'Failed to save token info.'));
        });
      }).catch((err: ResponseData) => {
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

      let reqData = new HttpParams()
        .set('grant_type', reqTokenInfo.grantType)
        
      if (reqTokenInfo.grantType == 'password') {
        reqData = reqData.set('username', reqTokenInfo.username)
                         .set('password', reqTokenInfo.password);
      } else if (reqTokenInfo.grantType == 'refresh_token') {
        reqData = reqData.set('refresh_token', reqTokenInfo.refreshToken);
      }

      const reqHeaders = new HttpHeaders()
        .set('Authorization', this.getBasicAuthorization())
        .set('Content-Type', 'application/x-www-form-urlencoded');

      this.http.post(`${this.reqAuthUrl}/oauth/token`, null,{
        headers: reqHeaders,
        params: reqData
      })
      .subscribe(data => {
        resolve(TokenInfo.fromData(JSON.stringify(data)));
      }, (err: HttpErrorResponse)  => {
        reject(ResponseData.fromHttpErr(err));
      });
    });
  }

}
