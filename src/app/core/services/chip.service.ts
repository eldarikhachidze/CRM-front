import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChipService extends BaseService{

  getALlChip(): Observable<any> {
    return this.get<any>('chip');
  }
}
