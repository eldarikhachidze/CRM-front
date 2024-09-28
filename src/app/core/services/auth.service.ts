import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable, tap} from "rxjs";
import {Login} from "../interfaces/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{

  login(data: Login): Observable<any> {
    return this.post('auth/login/', data)
      .pipe(
        tap(response => {
          this.saveToken(response.accessToken, response.refreshToken);
        })
      )
  }

  saveToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('accessToken', refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessToken');
  }
}
