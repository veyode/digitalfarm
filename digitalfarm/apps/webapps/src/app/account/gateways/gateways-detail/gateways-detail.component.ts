import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from "rxjs/operators";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {GatewaysService} from "../../../core/services/gateways/gateways.service";
import {GatewaysInterface} from "../../../core/interfaces/gateways.interface";
import * as L from 'leaflet';

@Component({
  selector: 'waziupfront-gateways-detail',
  templateUrl: './gateways-detail.component.html',
  styles: [
  ],
})
export class GatewaysDetailComponent implements OnInit,OnDestroy {
  private unsubscribeAll = new Subject;
  gatewaysdetail:GatewaysInterface;
  gateways_mapdata:GatewaysInterface;
  gatewayid:any;
  loading=false;

  constructor(
    private _gatewaysService:GatewaysService,
    private router: Router
  ) { }

  ngOnInit(){
    this.loading=true;
    this.gatewayid=sessionStorage.getItem('gatewayId');
    this. getDetailProject();
    this.getGatewayslocalisationmap();
  }


  getDetailProject(){

   try {

     this._gatewaysService.getgatewaysDetail(this.gatewayid).pipe(takeUntil(this.unsubscribeAll)).subscribe(
       (res) => {

         if (res) {
           this.loading=false;
           this.gatewaysdetail=res;
           console.log('gatewaydetail',res);

         }
       },
       (error) => {
         if (error) {

         }
       });

   }catch (e) {
      console.log('Erreur',e)
   }

  }

  getGatewayslocalisationmap(){

    try {

      this._gatewaysService.getgatewaysDetail(this.gatewayid).pipe(takeUntil(this.unsubscribeAll)).subscribe(
        (res) => {
          this.gateways_mapdata=res;


          const map = L.map('gatewaysmap').setView([5.355577644, -3.925080299],2.5);
          const  mapLink =
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';

          L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; ' + mapLink + ' Contributors',
            }).addTo(map);


          const marker = new L.marker([this.gateways_mapdata.location.latitude, this.gateways_mapdata.location.longitude])
            .bindPopup('<h5>'+this.gateways_mapdata.name+'</h5> ')
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

  navigatedeviceDetail(device_id){
    sessionStorage.setItem('deviceId',device_id);
    this.router.navigate([ '/account/devices/detail' ]);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
