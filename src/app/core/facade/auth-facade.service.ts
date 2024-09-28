import { Injectable } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

import {Observable} from "rxjs";
import {Login, LoginResponse} from "../interfaces/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

    constructor(
      private authService: AuthService,
      private router: Router
    ) { }

  login(data: Login): Observable<LoginResponse> {
    return this.authService.login(data);
  }

  handleLoginResponse(response: LoginResponse): void {
    const { accessToken, refreshToken } = response.token;
    this.authService.saveToken(accessToken, refreshToken);
    this.router.navigate(['/dashboard']);  // Redirect after successful login
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirect to login page on logout
  }

  getToken(): string | null {
    return this.authService.getToken();
  }


}
