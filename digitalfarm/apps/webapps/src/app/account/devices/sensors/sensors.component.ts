import {Component, OnDestroy, OnInit} from '@angular/core';

import {DevicesService} from "../../../core/services/devices/devices.service";
import {Router} from "@angular/router";
import Chart from "chart.js";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {SensorsInterface} from "../../../core/interfaces/sensors.interface";

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'waziupfront-sensors',
  templateUrl: './sensors.component.html',
  styles: [
  ],
})
export class SensorsComponent implements OnInit,OnDestroy  {
  sensorid:any;
  deviceid:any;
  sensor_data:SensorsInterface;
  sensorchart_data:any;
  loadingsensor=false;
  private unsubscribeAll = new Subject;

  constructor(
    private _devicesService:DevicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadingsensor=true;
    this.sensorid=sessionStorage.getItem('sensorId');
    this.deviceid=sessionStorage.getItem('deviceId');
    this.sensorChart();
    this.getsensor();
  }


  getsensor(){

    try {

      this._devicesService.getOnlysensor(this.deviceid,this.sensorid).pipe(takeUntil(this.unsubscribeAll)).subscribe(
        (res) => {
          this.loadingsensor=false;
          this.sensor_data=res;
          console.log('sensordata',this.sensor_data)
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



  sensorChart(){

    this._devicesService.getgatewaysSensor(this.deviceid,this.sensorid).pipe(takeUntil(this.unsubscribeAll)).subscribe(
      (res) => {
        this.sensorchart_data=res;
        console.log('request-data',res)

        let data=[];
        data=this.sensorchart_data;

        //liste des capteurs

        const sensor=[];
        //fin list des capteurs
        console.log('sensorchart',data)


        const alldate=data.map(resul=>resul.timestamp);
        const chartlabels=[];
        alldate.forEach((resuls)=>{
          const mom=new Date(resuls);
          chartlabels.push(mom.toLocaleTimeString('fr',{year: 'numeric',month:'short',day: 'numeric'}));
        });


        // tslint:disable-next-line:no-shadowed-variable
          data.map((res)=>{
            sensor.push(res.value);
          });
          console.log(sensor)
          const ctx = document.getElementById('sensorChart');
          // @ts-ignore
          const myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: chartlabels,
              datasets: [
                {
                  label: this.sensorid,
                  data: sensor,
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





      },
      (error) => {
        if (error) {
          console.log('erreur',error)
        }
      });


  }


  download_chart_csv(){
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.sensorchart_data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'waziup-front');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }

  ngOnDestroy(){
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
