import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Events } from 'ionic-angular';

import { EnvVariable } from './../environments/env-variable';

import { ResponseData } from './../models/ResponseData';
import { TokenInfo } from './../models/TokenInfo';
import { UserRegInfo } from './../models/UserRegInfo';

@Injectable()
export class UserProvider {

  private reqUrl: string;

  constructor(
    private http: HttpClient,
    private events: Events
  ) {
    this.reqUrl = EnvVariable.resourceServerUrl;

    this.events.subscribe('tokenInfo:set', (tokenInfo: TokenInfo) => {
      this.updateSignIn(tokenInfo.accessToken);
    });
  }

  void() { };

  signUp(user: UserRegInfo): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      this.http.post(`${this.reqUrl}/user/reg`, user)
      .subscribe((resData: ResponseData) => {
        if (resData.res == true) {
          resolve();
        } else {
          reject(resData);
        }
      }, (err) => {
        reject(err);
      });
    });
  }

  private updateSignIn(accessToken: string): void {
    this.http.post(`${this.reqUrl}/user/update_sign_in`, null, {
      headers: new HttpHeaders().set('Authorization', 'bearer ' + accessToken)
    }).subscribe();
  }

}
