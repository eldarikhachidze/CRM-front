import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {SlotMachine} from "../interfaces/slot-machine";

@Injectable({
  providedIn: 'root'
})
export class SlotMachineService extends BaseService {

  getSlotMachines(): Observable<SlotMachine[]> {
    return this.get<SlotMachine[]>('slotmachines');
  }

  getSlotMachine(id: number) {
    return this.get(`slot/${id}`);
  }

  createSlotMachine(data: any) {
    return this.post('slot', data);
  }

  updateSlotMachine(id: number, data: any) {
    return this.put(`slot/${id}`, data);
  }

  deleteSlotMachine(id: number) {
    return this.delete(`slot/${id}`);
  }
}
