import { ResponseData } from './../models/ResponseData';
import { AuthProvider } from './Auth';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaderResponse, HttpSentEvent, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  isRefreshingToken: boolean = false;

  constructor(private authService: AuthProvider) { }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    return next.handle(req.clone()).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 0:
              return this.handle0Error(error);
            case 400:
              return this.handle400Error(error);
            case 401:
              return this.handle401Error(error);
            case 403:
              return this.handle403Error(error);
            default:
              return this.handleError(error);
          }
        } else {
          return _throw(error);
        }
      })
    );
  }

  handle0Error(error) {
    if (error && error.status === 0 && error.error instanceof ProgressEvent) {
      return _throw(`[${error.status}] ${error.message}`);
    }
    
    return _throw(error);
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // this.authService.signOut();
      return _throw(`[${error.status}] ${error.error.error}: ${error.error.error_description}`);
    }
    
    return _throw(error);
  }

  handle401Error(error) {
    if (error && error.status === 401 && error.error && error.error.error === 'invalid_token') {
      return _throw(`[${error.status}] ${error.error.error}: ${error.error.error_description}`);
      // return _throw(`[${error.status}] ${error.error.error}: Access token expired`);
    }

    return _throw(error);
  }

  handle403Error(error) {
    return _throw(`[${error.status}] Forbidden`);
  }

  handleError(error) {
    if(error && error.error instanceof resError) {
      return _throw(`[${error.status}] ${error.error.error}: ${error.error.error_description}`);
    } else {
      return _throw(error);
    }
  }

}

class resError {
  error: string;
  error_description: string;
}