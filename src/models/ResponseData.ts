import { HttpErrorResponse } from "@angular/common/http";

export class ResponseData {

  res: boolean;
  code: number;
  msg: string;
  data: any;

  static fromCodeAndData(code: number, msg: any) {
    let responseData = new this();
    responseData.res = false;
    responseData.code = code;
    responseData.msg = msg;
    return responseData;
  }

}