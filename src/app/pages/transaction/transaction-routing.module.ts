import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TransactionComponent} from "./transaction.component";
import {DiscountLiveComponent} from "./components/discount-live/discount-live.component";
import {DiscountSlotComponent} from "./components/discount-slot/discount-slot.component";
import {FillCreditComponent} from "./components/fill-credit/fill-credit.component";

const routes: Routes = [
  {
    path: '',
    component: TransactionComponent,
    children: [
      {
        path: 'live',
        component: DiscountLiveComponent
      },
      {
        path: 'slot',
        component: DiscountSlotComponent
      },
      {
        path: 'fill-credit',
        component: FillCreditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
