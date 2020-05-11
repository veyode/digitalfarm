import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GatewaysComponent} from "./gateways.component";
import {GatewaysListComponent} from "./gateways-list/gateways-list.component";
import {GatewaysDetailComponent} from "./gateways-detail/gateways-detail.component";


const routes: Routes = [
  {
    path: '',
    component: GatewaysComponent,
    children: [
      {
        path: '',
        component:GatewaysListComponent
      },
      {
        path: 'list',
        component:GatewaysListComponent
      },
      {
        path: 'detail',
        component:GatewaysDetailComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GatewaysRoutingModule { }
