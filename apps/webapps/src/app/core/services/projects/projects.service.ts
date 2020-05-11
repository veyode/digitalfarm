import { Injectable } from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private endPoint = {
    projects: 'projects',
    sensors_link:'sensors_data'
  };

  constructor(private _api: ApiService) { }


  getprojectsDetail(project_id:any) {
    return this._api
      ._get(`${this.endPoint.projects}/${project_id}?full=true`)
      .pipe(map((response: any) => response), catchError((error) => throwError(error)));
  }

  getgatewaysSensor(devices_id:any) {
    return this._api
      ._get(`${this.endPoint.sensors_link}?device_id=${devices_id}&sort=dsc&calibrated=true&limit=20`)
      .pipe(map((response: any) => response), catchError((error) => throwError(error)));
  }
}
