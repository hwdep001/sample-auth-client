import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Events } from 'ionic-angular';

import { EnvVariable } from './../environments/env-variable';

import { TokenInfo } from './../models/TokenInfo';

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

  void(){};

  private updateSignIn(accessToken: string): void {
    this.http.post(`${this.reqUrl}/user/update_sign_in`, null, {
      headers: new HttpHeaders().set('Authorization', 'bearer ' + accessToken)
    }).subscribe();
  }

}
