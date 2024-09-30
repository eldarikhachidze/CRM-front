import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRoutingModule } from './transaction-routing.module';
import {TransactionComponent} from "./transaction.component";
import { DiscountLiveComponent } from './components/discount-live/discount-live.component';
import { DiscountSlotComponent } from './components/discount-slot/discount-slot.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    TransactionComponent,
    DiscountLiveComponent,
    DiscountSlotComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class TransactionModule { }
