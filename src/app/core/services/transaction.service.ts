import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {catchError, Observable, throwError} from "rxjs";
import {FillCredit} from "../interfaces/transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService {

  createFillCredit(data: any): Observable<any> {
    return this.post<any>('transactions/fill-credit/', data);
  }

  getFillCredits(params: {}): Observable<FillCredit[]> {
    return this.get<FillCredit[]>('transactions/fill-credit/', params)
      .pipe(
        catchError(error => {
          return throwError(error)
        })
      )
  }

  getFillCredit(id: number): Observable<FillCredit> {
    return this.get<FillCredit>(`transactions/fill-credit/${id}/`);
  }

  updateFillCredit(id: number, data: any): Observable<any> {
    return this.put<any>(`transactions/fill-credit/${id}/`, data);
  }

  deleteFillCredit(id: number): Observable<any> {
    return this.delete<any>(`transactions/fill-credit/${id}/`);
  }

}
