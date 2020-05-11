import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthGuard} from "./guards/auth/auth.guard";
import {ChildGuard} from "./guards/child/child.guard";
import {throwIfAlreadyLoaded} from "./module-import-guard";
import {ServicesModule} from "./services/services.module";
import {HttpClientModule} from "@angular/common/http";

const CORE_PROVIDERS = [
  AuthGuard,
  ChildGuard,
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ServicesModule
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...CORE_PROVIDERS,
      ],
    };
  }
}
