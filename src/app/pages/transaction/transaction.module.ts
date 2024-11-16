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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import { EditFillCreditComponent } from './components/edit-fill-credit/edit-fill-credit.component';


@NgModule({
  declarations: [
    TransactionComponent,
    DiscountLiveComponent,
    DiscountSlotComponent,
    FillCreditComponent,
    EditFillCreditComponent
  ],
    imports: [
        CommonModule,
        TransactionRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatTableModule
    ]
})
export class TransactionModule { }
