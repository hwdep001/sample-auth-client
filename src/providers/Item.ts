import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { EnvVariable } from './../environments/env-variable';

import { AuthProvider } from './Auth';

import { ResponseDate } from './../models/ResponseDate';
import { Item } from './../models/Item';

@Injectable()
export class ItemProvider {

  private reqUrl: string;

  constructor(
    private http: HttpClient,
    private authService: AuthProvider
  ) {
    this.reqUrl = EnvVariable.resourceServerUrl;
  }

  async getItemList(): Promise<Array<Item>> {
    const bearerAuthorization: string = await this.authService.getBearerAuthorization();

    return new Promise<Array<Item>>((resolve, reject) => {

      this.http.post(`${this.reqUrl}/item/list`, null,{
        headers: new HttpHeaders().set('Authorization', bearerAuthorization)
      })
      .subscribe(data => {
        const resData = data as ResponseDate;

        if (resData.res == true) {
          resolve(resData.data as Array<Item>);
        } else {
          reject(resData.code + ": " + resData.msg)
        }
      }, err => {
        reject(err);
      });
    });
  }

}
