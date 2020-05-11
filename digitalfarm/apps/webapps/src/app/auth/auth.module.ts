import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {UiModule} from "../shared/ui/ui.module";
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
  /*  CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    UiModule*/
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    SharedModule,
    UiModule
  ]
})
export class AuthModule { }
