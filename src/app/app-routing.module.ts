import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./features/main-layout/main-layout.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {LoginGuard} from "./core/guard/login.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoginGuard],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'transaction',
        loadChildren: () => import('./pages/transaction/transaction.module').then(m => m.TransactionModule),
      },
      {
        path: 'chip',
        loadChildren: () => import('./pages/chip/chip.module').then(m => m.ChipModule),
      },
      {
        path: 'slot',
        loadChildren: () => import('./pages/slot/slot.module').then(m => m.SlotModule),
      }
    ],
  },

  {path: '**', redirectTo: 'auth/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
