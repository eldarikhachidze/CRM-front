import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChipRoutingModule } from './chip-routing.module';
import {ChipComponent} from "./chip.component";


@NgModule({
  declarations: [
    ChipComponent
  ],
  imports: [
    CommonModule,
    ChipRoutingModule
  ],
})
export class ChipModule { }
