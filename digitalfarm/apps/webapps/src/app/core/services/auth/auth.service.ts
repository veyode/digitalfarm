import { Injectable } from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {UserInterface} from "../../interfaces/user.interface";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endPoint = {
    login: 'auth/token',
    register: 'auth/signup',
    emailConfirm: 'auth/signup/confirm',
    forgot: 'auth/forgot/password',
    change: 'auth/reset/password',
    current_user: 'users'
  };

  public currentUser: Observable<UserInterface>
  private currentUserSubject: BehaviorSubject<UserInterface>

  constructor(private _api: ApiService) {}

  loginUser(data: any) {
    return this._api
      ._post(this.endPoint.login, data)
      .pipe(map((response: any) => response), catchError((error) => throwError(error)));
  }

  registerUser(data: UserInterface) {
    return this._api
      ._post(this.endPoint.register, data)
      .pipe(map((response: any) => response.data), catchError((error) => throwError(error)));
  }

  forgotPassword(data) {
    return this._api
      ._post(this.endPoint.forgot, data)
      .pipe(map((response: any) => response.data), catchError((error) => throwError(error)));
  }

  changePassword(data) {
    return this._api
      ._post(this.endPoint.change, data)
      .pipe(map((response: any) => response.data), catchError((error) => throwError(error)));
  }

  checkToken(token: string) {
    return this._api
      ._get(`${this.endPoint.forgot}/${token}`)
      .pipe(map((response: any) => response.data), catchError((error) => throwError(error)));
  }


  getcurrentUser(username: string) {
    return this._api
      ._get(`${this.endPoint.current_user}/?username=${username}`)
      .pipe(map((response: any) => response), catchError((error) => throwError(error)));
  }

  storeCredentials(credentials: any) {
    sessionStorage.setItem('credentials', JSON.stringify(credentials));
  }

  isAuthenticated() {
    return !!sessionStorage.getItem('credentials');
  }

  getCredentials() {
    const credentials = sessionStorage.getItem('credentials');
    return of(JSON.parse(credentials));
  }

  confirmEmail(token: any) {
    return this._api
      ._get(`${this.endPoint.emailConfirm}/${token}`)
      .pipe(map((response: any) => response.data), catchError((error) => throwError(error)));
  }


  logout() {
    sessionStorage.removeItem('credentials')
    sessionStorage.removeItem('projectId');
    sessionStorage.removeItem('actuatorId');
    sessionStorage.removeItem('deviceId');
    sessionStorage.removeItem('sensorId');
    sessionStorage.removeItem('useremail');
    sessionStorage.removeItem('gatewayId');
  }


}
