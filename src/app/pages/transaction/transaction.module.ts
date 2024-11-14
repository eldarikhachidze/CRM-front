import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRoutingModule } from './transaction-routing.module';
import {TransactionComponent} from "./transaction.component";
import { DiscountLiveComponent } from './components/discount-live/discount-live.component';
import { DiscountSlotComponent } from './components/discount-slot/discount-slot.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { FillCreditComponent } from './components/fill-credit/fill-credit.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    TransactionComponent,
    DiscountLiveComponent,
    DiscountSlotComponent,
    FillCreditComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class TransactionModule { }
