import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth/auth.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token: string;
  url: string = environment.serverUrl;

  constructor(public auth: AuthService) {
    this.authCredentials();
  }

  authCredentials() {
    this.auth.getCredentials().subscribe((res) => {
      if (res) {
        this.token = res;
      }
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === this.url+'/auth/token'
      || req.url === this.url+'/devices'
    /*  || req.url === this.url+'/devices/detail'*/

    ) {
      return next.handle(req.clone({
        setHeaders: {}
      }));
    }
    this.authCredentials();

    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
    }
    });
    return next.handle(tokenReq);
  }
}
