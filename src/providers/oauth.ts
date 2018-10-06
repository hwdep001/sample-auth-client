import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EnvVariable } from './../environments/env-variable';

import { ResponseDate } from '../models/ResponseDate';
import { Jwt } from '../models/Jwt';
import { ReqJwt } from '../models/ReqJwt';

@Injectable()
export class OauthProvider {

  private reqUrl: string = null;

  constructor(
    public http: HttpClient
  ) {
    this.reqUrl = EnvVariable.resource_server_url;
  }

  getJWT(reqJwt: ReqJwt): Promise<Jwt> {
    return new Promise<Jwt>((resolve, reject) => {

      // reqJwt.client_id = EnvVariable.client_id;
      // reqJwt.client_secret = EnvVariable.client_secret;
      const reqData = reqJwt;

      this.http.post(`${this.reqUrl}/oauth/token`, reqData, {})
      .subscribe(data => {
        const resData = data as ResponseDate;

        if(resData.res == true) {
          resolve(resData.data as Jwt);
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
