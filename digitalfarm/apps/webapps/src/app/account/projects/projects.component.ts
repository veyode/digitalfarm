import { Component, OnInit ,OnDestroy} from '@angular/core';

import * as L from 'leaflet';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {ProjectsService} from "../../core/services/projects/projects.service";
import {ProjectInterface} from "../../core/interfaces/project.interface";
import set = Reflect.set;
import Chart from "chart.js";

@Component({
  selector: 'waziupfront-projects',
  templateUrl: './projects.component.html',
  styles: [
  ],
})
export class ProjectsComponent implements OnInit ,OnDestroy {

  private unsubscribeAll = new Subject;
  projectsdetail:ProjectInterface;
  projectsdetailchart:ProjectInterface;
  projectsdetailmap:ProjectInterface;
  projectid:any;
  projectloading = false;
  device_ids:any;

  constructor(
    private _projectsService:ProjectsService,
    private router: Router,

  ) { }

  ngOnInit(){
    this.projectloading=true;
    this.projectid=sessionStorage.getItem('projectId');
    this.getDetailProject();
    this.initDevicesmap();
    this.sensorChart();

  }


  getDetailProject(){

    try {

      this._projectsService.getprojectsDetail(this.projectid).pipe(takeUntil(this.unsubscribeAll)).subscribe(
        (res) => {

          if (res) {
            this.projectloading=false;
            this.projectsdetail=res;
            console.log('detail',this.projectsdetail);

          }
        },
        (error) => {
          console.log('erreur au niveau du code',error)
        });

    }catch (e) {
      console.log('erreur',e.message)
    }



  }






  initDevicesmap(){

    try {
      this._projectsService.getprojectsDetail(this.projectid).pipe(takeUntil(this.unsubscribeAll)).subscribe(
        (res) => {

          if (res) {

            this.projectsdetailmap=res;


            const all_devices_map = L.map('all_devices_map').setView([5.355577644, -3.925080299],10);
            const  mapLink =
              '<a href="http://openstreetmap.org">OpenStreetMap</a>';

            L.tileLayer(
              'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + mapLink + ' Contributors',
              }).addTo(all_devices_map);


            for (const device of this.projectsdetailmap.devices){

              const marker = new L.marker([device.location.longitude,device.location.latitude])
                .bindPopup('<h5>'+device.name+'</h5> ')
                .addTo(all_devices_map);

            }



          }
        },
        (error) => {
          if (error) {

          }
        });

    }catch (e) {
      console.log('erreur',e.message);
    }






  }

  navigategatewayDetail(gateway_id){
    sessionStorage.setItem('gatewayId',gateway_id);
    this.router.navigate([ '/account/gateways/detail' ]);
  }


  navigatedeviceDetail(device_id){
    sessionStorage.setItem('deviceId',device_id);
    this.router.navigate([ '/account/devices/detail' ]);
  }




  sensorChart(){
    this._projectsService.getprojectsDetail(this.projectid).pipe(takeUntil(this.unsubscribeAll)).subscribe(
      (res) => {

        if (res) {

          this.projectsdetailchart=res;

          let manu='';
          // tslint:disable-next-line:no-shadowed-variable
          for (const data of res.device_ids){

            manu+=','+data;

          }

          this.device_ids=manu.substr(1,manu.length)


          let data=[];

          // tslint:disable-next-line:triple-equals
          if (this.device_ids!=''){

            this._projectsService.getgatewaysSensor(this.device_ids).pipe(takeUntil(this.unsubscribeAll)).subscribe(
              (result) => {

                if (result) {

                  data=result;
                  console.log('sensorsxs',data);


                  //liste des capteurs
                  const bat=[];
                  const hm2=[];
                  const hm1=[];
                  //fin list des capteurs

                  // tslint:disable-next-line:no-shadowed-variable
                  data.map((res)=>{
                    console.log(res)

                    // tslint:disable-next-line:triple-equals
                    if (res.sensor_id=='HUM1' && res.device_id=='b827ebeea077_2'){
                      hm1.push(res.value)
                    }

                    // tslint:disable-next-line:triple-equals
                    if (res.sensor_id=='HUM1' && res.device_id=='b827ebeea077_3'){
                      hm2.push(res.value)
                    }


                    /*if (res.sensor_id=='SMC'){
                      smc.push(res.value);
                    }
                    if (res.sensor_id=='HUM'){
                      hm.push(res.value);
                    }*/

                  });

                  const alldate=data.map(resul=>resul.timestamp);
                  const chartlabels=[];
                  alldate.forEach((resuls)=>{
                    const mom=new Date(resuls);
                    chartlabels.push(mom.toLocaleTimeString('fr',{year: 'numeric',month:'short',day: 'numeric'}));
                  });

                  const  borderColor= [
                    '',
                    '',
                    '',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                  ];


                  const ctx = document.getElementById('myChart');
                  // @ts-ignore
                  const myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                      labels: chartlabels,
                      datasets: [
                        /* {
                           label: 'BAT',
                           data: bat,
                           borderColor: ' rgba(255, 206, 86, 1)',
                           borderWidth: 1,
                           fill: false,
                         },*/
                        {
                          label: 'HM1 (b827ebeea077_2)',
                          data: hm1,
                          borderColor: 'rgba(255, 99, 132, 1)',
                          borderWidth: 1,
                          fill: false,
                        }
                        ,
                        {
                          label: 'HUM1 (b827ebeea077_3)',
                          data: hm2,
                          borderColor: 'rgba(54, 162, 235, 1)',
                          borderWidth: 1,
                          fill: false,
                        }
                      ]
                    },
                    options: {
                      scales: {
                        yAxes: [{
                          ticks: {
                            beginAtZero: true
                          }
                        }]
                      }
                    }
                  });





                }
              },
              (error) => {
                if (error) {

                }
              });
          }



        }
      },
      (error) => {
        if (error) {

        }
      });
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
