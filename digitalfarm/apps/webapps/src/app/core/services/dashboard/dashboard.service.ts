import { Injectable } from '@angular/core';
import {ApiService} from "../api/api.service";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private endPoint = {
    projects: 'projects',
  };

  constructor(private _api: ApiService) { }

  getprojects() {
    return this._api
      ._get(`${this.endPoint.projects}/?full=false`)
      .pipe(map((response: any) => response), catchError((error) => throwError(error)));
  }


}
