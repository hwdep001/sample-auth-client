import { ReqJwt } from './../../models/ReqJwt';
import { ResponseDate } from './../../models/ResponseDate';
import { Jwt } from './../../models/Jwt';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OauthProvider {

  constructor(
    public http: HttpClient
  ) {

  }

  getJWT(reqIp: String, reqJwt: ReqJwt): Promise<Jwt> {
    return new Promise<Jwt>((resolve, reject) => {

      const reqData = reqJwt;

      this.http.post(`http://${reqIp}:18081/anonymous/oauth/token`, reqData, {})
      .subscribe(data => {
        const resData = data as ResponseDate;

        if(resData.res == true) {
          resolve(resData.data as Jwt);
        } else {
          const msg: String = resData.code + ": " + resData.msg;
          reject(msg);
        }

      }, err => {
        const resErr: String = JSON.stringify(err);
        reject(resErr);
      });
    });
  }

}
