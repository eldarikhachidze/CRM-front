import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {Chip} from "../interfaces/table";

@Injectable({
  providedIn: 'root'
})
export class ChipService extends BaseService{

  getChips(): Observable<Chip[]> {
    return this.get<Chip[]>('chip/');
  }
  getALlChip(): Observable<any> {
    return this.get<any>('chip');
  }
}
