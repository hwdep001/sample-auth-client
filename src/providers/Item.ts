import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EnvVariable } from './../environments/env-variable';

@Injectable()
export class ItemProvider {

  private reqUrl: string = null;

  constructor(
    private http: HttpClient
  ) {
    this.reqUrl = EnvVariable.resourceServerUrl;
  }

}
