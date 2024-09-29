import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {catchError, Observable, throwError} from "rxjs";
import {SlotMachine} from "../interfaces/slot-machine";

@Injectable({
  providedIn: 'root'
})
export class SlotMachineService extends BaseService {

  getSlotMachines(): Observable<SlotMachine[]> {
    return this.get<SlotMachine[]>('slotmachines');
  }

  closeSlotMachine(id: number, bvbMoney: number): Observable<any> {
    return this.patch(`slot-machine/${id}/close/`, {bvbMoney})
      .pipe(
        catchError(error => {
          console.log(error)
          return throwError(error)
        })
      )
  }

}
