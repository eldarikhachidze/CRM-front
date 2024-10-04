import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {catchError, Observable, throwError} from "rxjs";
import {SlotMachine} from "../interfaces/slot-machine";
import {Hall} from "../interfaces/slot";

@Injectable({
  providedIn: 'root'
})
export class SlotMachineService extends BaseService {

  // getHall(): Observable<Hall[]> {
  //   return this.get<Hall[]>('slot/halls/');
  // }

  closeSlotMachine(id: number, bvbMoney: number): Observable<any> {
    return this.put(`slot/daily-amounts/${id}/`, {bvbMoney})
      .pipe(
        catchError(error => {
          console.log(error)
          return throwError(error)
        })
      )
  }

}
