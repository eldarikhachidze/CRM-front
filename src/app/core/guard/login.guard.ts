import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthFacadeService} from "../facade/auth-facade.service";

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private authFacade: AuthFacadeService,
    private router: Router
  ) {
  }

  canActivate(): boolean {
    if (this.authFacade.isLoggedIn()) {
      this.router.navigate(['/slot']);
      return false;
    }
    return true;
  }
}
