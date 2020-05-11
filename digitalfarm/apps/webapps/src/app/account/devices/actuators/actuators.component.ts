import {Component, OnDestroy, OnInit} from '@angular/core';

import {DevicesService} from "../../../core/services/devices/devices.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ActuatorsInterface} from "../../../core/interfaces/actuators.interface";

@Component({
  selector: 'waziupfront-actuators',
  templateUrl: './actuators.component.html',
  styles: [
  ],
})
export class ActuatorsComponent implements OnInit ,OnDestroy{

  actuatorid:any;
  deviceid:any;
  actuator_data:ActuatorsInterface;
  private unsubscribeAll = new Subject;
  loadingactuator=false;

  constructor(
    private _devicesService:DevicesService,
    private router: Router
  ) { }

  ngOnInit(){
    this.loadingactuator=true;
    this.actuatorid=sessionStorage.getItem('actuatorId');
    this.deviceid=sessionStorage.getItem('deviceId');
    this.getactuator();

  }

  getactuator(){

    try {

      this._devicesService.getOnlyactuator(this.deviceid,this.actuatorid).pipe(takeUntil(this.unsubscribeAll)).subscribe(
        (res) => {
          this.loadingactuator=false;
          this.actuator_data=res;
          console.log('actuatordata',this.actuator_data)
        },
        (error) => {
          if (error) {
            console.log('erreur',error)
          }
        });

    }catch (e) {
      console.log('erreur')
    }

  }

  ngOnDestroy(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
