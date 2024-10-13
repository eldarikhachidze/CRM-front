import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SlotMachineService extends BaseService {


  closeSlotMachine(id: number, bvbMoney: number): Observable<any> {
    return this.put(`slot/close-slot-machine/${id}/`, {amount: bvbMoney})
      .pipe(
        catchError(error => {
          return throwError(error)
        })
      )
  }

}
