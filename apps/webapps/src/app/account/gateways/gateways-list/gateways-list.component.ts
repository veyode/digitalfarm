import {Component, OnDestroy, OnInit} from '@angular/core';

import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {GatewaysService} from "../../../core/services/gateways/gateways.service";
import {GatewaysInterface} from "../../../core/interfaces/gateways.interface";

@Component({
  selector: 'waziupfront-gateways-list',
  templateUrl: './gateways-list.component.html',
  styles: [
  ],
})
export class GatewaysListComponent implements OnInit,OnDestroy {

  private unsubscribeAll = new Subject;
  gateways_data:GatewaysInterface | any;
  loadinggateways=false;
  datalength:any;

  constructor(
    private _gatewaysService:GatewaysService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadinggateways=true;
    this.getallgateways();
  }

  getallgateways(){
    const username=JSON.parse(sessionStorage.getItem('useremail'));
    this._gatewaysService.getgatewaysall().pipe(takeUntil(this.unsubscribeAll)).subscribe(
      (res) => {
        const fuel=[];
        for (const data of res){
          if (data.owner===username){
            fuel.push(data);
          }
        }
        this.loadinggateways=false;
        this.gateways_data=fuel;
        this.datalength=fuel.length;
        console.log('getwaydata',this.gateways_data)

      },
      (error) => {
        if (error) {
          console.log('erreur',error)
        }
      });
  }

  navigategatewayDetail(gateway_id){
    sessionStorage.setItem('gatewayId',gateway_id);
    this.router.navigate([ '/account/gateways/detail' ]);
  }


  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
