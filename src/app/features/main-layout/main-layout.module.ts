import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainLayoutComponent} from "./main-layout.component";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./components/header/header.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";



@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,

  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    MatListModule,
    RouterLinkActive,
    MatToolbarModule,
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class MainLayoutModule { }
