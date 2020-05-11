import {Component, EventEmitter, OnDestroy, OnInit, TemplateRef} from '@angular/core';


import Chart from "chart.js";
import {DevicesService} from "../../../core/services/devices/devices.service";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import * as L from 'leaflet';
import {DeviceInterface} from "../../../core/interfaces/device.interface";
import {FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Toast, ToastrService} from "ngx-toastr";


@Component({
  selector: 'waziupfront-device-detail',
  templateUrl: './device-detail.component.html',
  styles: [
  ],
})
export class DeviceDetailComponent implements OnInit,OnDestroy {

  deviceid:any;
  device_data:DeviceInterface;
  device_mapdata:DeviceInterface;
  private unsubscribeAll = new Subject;
  loadingdevice=false;


  //edit and delete device on this project
  public deletedDeviceForm: FormGroup;
  public updateDeviceForm: FormGroup;
  event: EventEmitter<any> = new EventEmitter();

  modalUpdate: BsModalRef;
  modalDelete: BsModalRef;


  constructor(
    private _devicesService:DevicesService,
    private router: Router,
    private bsModalService: BsModalService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(){

    this.loadingdevice=true;
    this.deviceid=sessionStorage.getItem('deviceId');
    this.getdevice();
    this.initMap();


  }

  getdevice(){

    try {
      this._devicesService.getOnlydevice(this.deviceid).pipe(takeUntil(this.unsubscribeAll)).subscribe(
        (res) => {
          this.loadingdevice=false;
          this.device_data=res;
          console.log('devicedata',this.device_data);
        },
        (error) => {
          if (error) {
            console.log('erreur',error)
          }
        });

    }catch (e) {
      console.log('erreur');
    }

  }


  initMap(){

    try {

      this._devicesService.getOnlydevice(this.deviceid).pipe(takeUntil(this.unsubscribeAll)).subscribe(
        (res) => {
          this.device_mapdata=res;


          const map = L.map('map').setView([5.355577644, -3.925080299],2.5);
          const  mapLink =
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';

          L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; ' + mapLink + ' Contributors',
            }).addTo(map);


          const marker = new L.marker([this.device_mapdata.location.latitude, this.device_mapdata.location.longitude])
            .bindPopup('<h5>'+this.device_mapdata.name+'</h5> ')
            .addTo(map);


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

  navigatesensorDetail(sensor_id){
    sessionStorage.setItem('sensorId',sensor_id);
    this.router.navigate([ '/account/devices/sensors' ]);
  }

  navigateactuatorDetail(actuator_id){
    sessionStorage.setItem('actuatorId',actuator_id);
    this.router.navigate([ '/account/devices/actuators' ]);
  }


  //formulaire de suppression
  updatedeviceModal(modalId: number, template: TemplateRef<any>) {
    this._devicesService
      .getOnlydevice(modalId)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(
        dataChild => {
          if (dataChild) {

            this.modalUpdate = this.bsModalService.show(template, {
              class: 'modal-md'
            });
          }
        },
        error => error
      );
  }

  //update device method
  updateDevice(){
    this.modalUpdate.hide();
    this._toastr.success(`Mise a jours des donnee`, 'Device')
  }

  ngOnDestroy(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
