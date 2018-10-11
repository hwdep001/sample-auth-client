import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EnvVariable } from './../environments/env-variable';

@Injectable()
export class UserProvider {

  private reqUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.reqUrl = EnvVariable.resourceServerUrl;
  }

}
