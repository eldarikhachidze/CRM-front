import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TableComponent} from "./table.component";
import {EditCloseFlotComponent} from "./components/edit-close-flot/edit-close-flot.component";

const routes: Routes = [
  {
    path: '',
    component: TableComponent
  },
  {
    path: 'edit/:id',
    component: EditCloseFlotComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule {
}
