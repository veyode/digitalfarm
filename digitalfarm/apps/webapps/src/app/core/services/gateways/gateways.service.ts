import { Injectable } from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class GatewaysService {

  private endPoint = {
    gateways: 'gateways',

  };

  constructor(private _api: ApiService) { }

  getgatewaysall() {
    return this._api
      ._get(`${this.endPoint.gateways}/?full=false`)
      .pipe(map((response: any) => response), catchError((error) => throwError(error)));
  }

  getgatewaysDetail(gateway_id:any) {
    return this._api
      ._get(`${this.endPoint.gateways}/${gateway_id}?full=true`)
      .pipe(map((response: any) => response), catchError((error) => throwError(error)));
  }



}
