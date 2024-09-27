import {inject, Injectable} from '@angular/core';
import {environment} from "../../../enviroment/enviroment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  apiUrl = environment.apiUrl
  http: HttpClient = inject(HttpClient)

  post<t>(url: string, data: any): Observable<t> {
    return this.http.post<t>(this.apiUrl + url, data)
  }

  get<t>(url: string, params?: any): Observable<t> {
    return this.http.get<t>(this.apiUrl + url, {params})
  }

  put<t>(url: string, body?: any): Observable<t> {
    return this.http.put<t>(this.apiUrl + url, body)
  }

  delete<t>(url: string): Observable<t> {
    return this.http.delete<t>(this.apiUrl + url)
  }


}

