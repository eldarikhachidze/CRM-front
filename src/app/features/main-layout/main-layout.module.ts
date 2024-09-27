import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainLayoutComponent} from "./main-layout.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./components/header/header.component";



@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,

  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class MainLayoutModule { }
