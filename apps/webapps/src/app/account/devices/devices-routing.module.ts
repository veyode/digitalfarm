import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActuatorsComponent} from "./actuators/actuators.component";
import {SensorsComponent} from "./sensors/sensors.component";
import {DeviceDetailComponent} from "./device-detail/device-detail.component";
import {DeviceListComponent} from "./device-list/device-list.component";
import {DevicesComponent} from "./devices.component";


const routes: Routes = [

  {
    path: '',
    component: DevicesComponent,
    children: [
      {
        path: '',
        component:DeviceListComponent
      },
      {
        path: 'list',
        component:DeviceListComponent
      },
      {
        path: 'detail',
        component:DeviceDetailComponent
      },
      {
        path: 'sensors',
        component:SensorsComponent
      },
      {
        path: 'actuators',
        component:ActuatorsComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
