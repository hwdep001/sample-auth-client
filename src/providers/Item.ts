import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { EnvVariable } from './../environments/env-variable';

import { AuthProvider } from './Auth';

import { ResponseData } from './../models/ResponseData';
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
      .subscribe((resData: ResponseData) => {
        if (resData.res == true) {
          resolve(resData.data as Array<Item>);
        } else {
          reject(resData);
        }
      }, (err) => {
        reject(err);
      });
    });
  }

}
