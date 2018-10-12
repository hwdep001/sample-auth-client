import { HttpErrorResponse } from "@angular/common/http";

export class ResponseData {

  res: boolean;
  code: number;
  msg: string;
  data: any;

  static fromHttpErr(errRes: HttpErrorResponse): ResponseData {
    let responseData = new this();
    responseData.res = errRes.ok;
    responseData.code = errRes.status;
    responseData.msg = errRes.error.error_description;
    responseData.data = errRes.error.error;
    return responseData;
  }

  static fromCodeAndData(code: number, msg: any) {
    let responseData = new this();
    responseData.res = false;
    responseData.code = code;
    responseData.msg = msg;
    return responseData;
  }

}