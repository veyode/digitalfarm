import {Component,  OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {DevicesService} from "../../../core/services/devices/devices.service";
import {takeUntil} from "rxjs/operators";
import {Router} from "@angular/router";
import {DeviceInterface} from "../../../core/interfaces/device.interface";
@Component({
  selector: 'waziupfront-device-list',
  templateUrl: './device-list.component.html',
  styles: [
  ],
})
export class DeviceListComponent implements OnInit,OnDestroy {

  datas:DeviceInterface | any;
  userinfo:any;
  loadingdevice=false;
  private unsubscribeAll = new Subject;



  constructor(
    private _devicesService:DevicesService,
    private router: Router,

  ) { }

  ngOnInit(){
    this.loadingdevice=true;
    this.userinfo=JSON.parse(sessionStorage.getItem('useremail'));
    this.getDiviceMs();
  }

  getDiviceMs() {
    const owner=this.userinfo;

    this._devicesService.getAlldevice().pipe(takeUntil(this.unsubscribeAll)).subscribe(
      (res) => {

        if (res) {
          const fuel=[];
          for (const data of res){
            if (data.owner===owner){
              fuel.push(data);
            }
          }
          this.loadingdevice=false;
          this.datas=fuel;
          console.log('fuel',this.datas);
        }
      },
      (error) => {
        if (error) {
          console.log('erreur',error)
        }
      });


  }





  voirDevicedetail(id_device:any){
    sessionStorage.setItem('deviceId',id_device);
    this.router.navigate(['/account/devices/detail']);
  }

  ngOnDestroy(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
