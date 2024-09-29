import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Observable, tap} from "rxjs";
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
        tap((response) => {
            console.log('Full response:', response);  // Log the full response to see its structure
            if (response.message) {
              console.log('Success:', response.message);  // Print success message if it exists
            } else {
              console.warn('No message found in response.');
            }
          },
          (error) => {
            console.error('Error:', error.error.message);  // Print error message
          })
      )
  }

}
