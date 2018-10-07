import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EnvVariable } from '../environments/env-variable';

import { ResponseDate } from '../models/ResponseDate';
import { TokenInfo } from '../models/TokenInfo';
import { ReqTokenInfo } from '../models/ReqTokenInfo';

@Injectable()
export class TokenProvider {

  private reqUrl: string = null;

  constructor(
    public http: HttpClient
  ) {
    this.reqUrl = EnvVariable.resource_server_url;
  }

  getToken(reqTokenInfo: ReqTokenInfo): Promise<TokenInfo> {
    return new Promise<TokenInfo>((resolve, reject) => {

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
        const resErr: string = JSON.stringify(err);
        reject(resErr);
      });
    });
  }

}
