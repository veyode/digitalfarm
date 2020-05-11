import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthModule} from "./auth/auth.module";
import {CoreModule} from "./core/core.module";
import {AccountModule} from "./account/account.module";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "./core/interceptors/token.interceptor";
import {ErrorsInterceptor} from "./core/interceptors/errors.interceptor";
import {UiModule} from "./shared/ui/ui.module";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const  APP_MODULE=[
  BrowserAnimationsModule,
  BrowserModule,
  FormsModule,
  AuthModule,
  CoreModule,
  AccountModule,
  AppRoutingModule,
  ModalModule.forRoot(),
  ToastrModule.forRoot({
    timeOut: 5000,
  }),
];

@NgModule({
  declarations: [AppComponent, AccountComponent, AuthComponent, LoginComponent, RegisterComponent, ResetPasswordComponent],
    imports: [
        ...APP_MODULE,
        UiModule,
        ReactiveFormsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
