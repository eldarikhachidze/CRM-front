import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SlotComponent} from "./slot.component";

const routes: Routes = [
  {
    path: '',
    component: SlotComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlotRoutingModule { }
