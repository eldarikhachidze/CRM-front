import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./features/main-layout/main-layout.component";
import {AuthGuard} from "./core/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  // Public routes (login, etc.)
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
  },

  // Protected routes with MainLayout (header + authenticated pages)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],  // Protect these routes
    children: [
      {
        path: 'chip',
        loadChildren: () => import('./pages/chip/chip.module').then(m => m.ChipModule),
      },
      {
        path:'slot',
        loadChildren: () => import('./pages/slot/slot.module').then(m => m.SlotModule),
      }
      // Add more authenticated routes here
    ],
  },

  // Redirect any unmatched paths to login
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
