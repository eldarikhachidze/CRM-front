import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlotRoutingModule} from './slot-routing.module';
import {SlotComponent} from "./slot.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    SlotComponent,
  ],
  imports: [
    CommonModule,
    SlotRoutingModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
  ]
})
export class SlotModule {
}
