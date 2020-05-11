import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiService} from "./api/api.service";
import {AuthService} from "./auth/auth.service";
import {UserService} from "./user/user.service";
import {DashboardService} from "./dashboard/dashboard.service";
import {GatewaysService} from "./gateways/gateways.service";
import {ProjectsService} from "./projects/projects.service";
import {DevicesService} from "./devices/devices.service";


const SERVICES = [
  ApiService,
  AuthService,
  UserService,
  DashboardService,
  GatewaysService,
  ProjectsService,
  DevicesService
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [ ...SERVICES ]
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServicesModule,
      providers: [ ...SERVICES ]
    };
  }
}
