// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {AuthFacadeService} from "../facade/auth-facade.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authFacade: AuthFacadeService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = this.authFacade.getToken();  // Check for a valid token

    if (token) {
      return true;  // Token exists, allow access
    } else {
      this.router.navigate(['/auth/login']);  // Redirect to login if not authenticated
      return false;
    }
  }
}
