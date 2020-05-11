import { Injectable } from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {ApiService} from "../api/api.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private endPoint = {
    devices: 'devices',
    sensors_link:'sensors_data'
  };
  constructor(private _api: ApiService) { }

  getAlldevice(){
    return this._api
      ._get(`${this.endPoint.devices}`,)
      .pipe(map((response: any) => response), catchError((error) => throwError(error)));
  }

  getDevices(owner_email) {
   //{ q: [`owner==${owner_email}` ]
    return this._api
      ._get(`${this.endPoint.devices}`,{ q: [`owner==${owner_email}` ]   })
      .pipe(map((response: any) => response), catchError((error) => throwError(error)));
  }

  getOnlydevice(deviceid:any) {

    return this._api
      ._get(`${this.endPoint.devices}/${deviceid}`)
      .pipe(map((response: any) => response), catchError((error) => throwError(error)));
  }

  getgatewaysSensor(devices_id:any,sensor_id:any,limit=20) {
    return this._api
      ._get(`${this.endPoint.sensors_link}?sort=dsc&calibrated=true&limit=${limit}&device_id=${devices_id}&sensor_id=${sensor_id}`)
      .pipe(map((response: any) => response), catchError((error) => throwError(error)));
  }

  getgatewaysSensorwithdays(devices_id:any,sensor_id:any,date_from,date_to,limit=20){

    if(date_from!='' || date_to!=''){
      return this._api
        ._get(`${this.endPoint.sensors_link}?sort=dsc&calibrated=true&limit=${limit}&device_id=${devices_id}&sensor_id=${sensor_id}&date_from=${date_from}&date_to=${date_to}`)
        .pipe(map((response: any) => response), catchError((error) => throwError(error)));
    }else {
      return this._api
        ._get(`${this.endPoint.sensors_link}?sort=dsc&calibrated=true&limit=${limit}&device_id=${devices_id}&sensor_id=${sensor_id}`)
        .pipe(map((response: any) => response), catchError((error) => throwError(error)));
    }

  }

  getOnlysensor(deviceid:any,sensorid:any) {

    return this._api
      ._get(`${this.endPoint.devices}/${deviceid}/sensors/${sensorid}`)
      .pipe(map((response: any) => response), catchError((error) => throwError(error)));
  }

  getOnlyactuator(deviceid:any,actuatorid:any) {

    return this._api
      ._get(`${this.endPoint.devices}/${deviceid}/actuators/${actuatorid}`)
      .pipe(map((response: any) => response), catchError((error) => throwError(error)));
  }



}
