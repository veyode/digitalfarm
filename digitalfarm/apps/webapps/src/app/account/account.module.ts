import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevicesComponent } from './devices/devices.component';
import { GatewaysComponent } from './gateways/gateways.component';
import { ProjectsComponent } from './projects/projects.component';
import { SensorsComponent } from './devices/sensors/sensors.component';
import { ActuatorsComponent } from './devices/actuators/actuators.component';
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { DeviceDetailComponent } from './devices/device-detail/device-detail.component';


@NgModule({
  declarations: [DashboardComponent, DevicesComponent, GatewaysComponent, ProjectsComponent, SensorsComponent, ActuatorsComponent, DeviceListComponent, DeviceDetailComponent],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
