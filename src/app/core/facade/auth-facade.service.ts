import {Injectable} from '@angular/core';
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
  ) {
  }

  login(data: Login): Observable<LoginResponse> {
    return this.authService.login(data);
  }

  handleLoginResponse(response: LoginResponse): void {
    const {access, refresh} = response;
    this.authService.saveToken(access, refresh);
    this.router.navigate(['/slot']);  // Redirect after successful login
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirect to login page on logout
  }

  getToken(): string | null {
    return this.authService.token;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

}
