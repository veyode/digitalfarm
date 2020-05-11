import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatewaysRoutingModule } from './gateways-routing.module';
import { GatewaysListComponent } from './gateways-list/gateways-list.component';
import { GatewaysDetailComponent } from './gateways-detail/gateways-detail.component';


@NgModule({
  declarations: [GatewaysListComponent, GatewaysDetailComponent],
  imports: [
    CommonModule,
    GatewaysRoutingModule
  ]
})
export class GatewaysModule { }
