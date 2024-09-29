import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Observable, tap} from "rxjs";
import {Login, LoginResponse} from "../interfaces/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  login(data: Login): Observable<LoginResponse> {
    return this.post<LoginResponse>('auth/login/', data)
  }

  saveToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  get token(): string | null {
    return localStorage.getItem('accessToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
