import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableRoutingModule} from './table-routing.module';
import {EditCloseFlotComponent} from './components/edit-close-flot/edit-close-flot.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { EditCountComponent } from './components/edit-count/edit-count.component';


@NgModule({
  declarations: [
    EditCloseFlotComponent,
    EditCountComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule
  ]
})
export class TableModule {
}
