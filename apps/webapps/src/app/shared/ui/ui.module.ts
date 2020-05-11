import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRoutingModule } from './ui-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [NavbarComponent, FooterComponent, SidebarComponent, LayoutComponent],
  exports: [
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    UiRoutingModule
  ]
})
export class UiModule { }
