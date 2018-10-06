import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EnvVariable } from './../environments/env-variable';

import { ResponseDate } from './../models/ResponseDate';
import { OauthInfo } from './../models/OauthInfo';
import { ReqOauthInfo } from './../models/ReqOauthInfo';

@Injectable()
export class OauthProvider {

  private reqUrl: string = null;

  constructor(
    public http: HttpClient
  ) {
    this.reqUrl = EnvVariable.resource_server_url;
  }

  getOauth(reqOauthInfo: ReqOauthInfo): Promise<OauthInfo> {
    return new Promise<OauthInfo>((resolve, reject) => {

      // reqOauthInfo.client_id = EnvVariable.client_id;
      // reqOauthInfo.client_secret = EnvVariable.client_secret;
      const reqData = reqOauthInfo;

      this.http.post(`${this.reqUrl}/oauth/token`, reqData, {})
      .subscribe(data => {
        const resData = data as ResponseDate;

        if(resData.res == true) {
          resolve(resData.data as OauthInfo);
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
