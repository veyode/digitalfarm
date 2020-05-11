import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectsComponent} from "./projects/projects.component";
import {AccountComponent} from "./account.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "../core/guards/auth/auth.guard";
import {ChildGuard} from "../core/guards/child/child.guard";


const routes: Routes = [

  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [ChildGuard],
    component: AccountComponent,
    children: [
      {
        path: '',
        component:DashboardComponent
      },
      {
        path: 'dashboard',
        component:DashboardComponent,
        canActivate: [AuthGuard],
        canActivateChild: [ChildGuard],
      },
      {
        path: 'devices',
        canActivate: [AuthGuard],
        canActivateChild: [ChildGuard],
        loadChildren: () =>
          import('./devices/devices.module').then(module => module.DevicesModule)
      },
      {
        path: 'gateways',
        canActivate: [AuthGuard],
        canActivateChild: [ChildGuard],
        loadChildren: () =>
          import('./gateways/gateways.module').then(module => module.GatewaysModule)
      },
      {
        path: 'projects',
        canActivate: [AuthGuard],
        canActivateChild: [ChildGuard],
        component:ProjectsComponent
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
