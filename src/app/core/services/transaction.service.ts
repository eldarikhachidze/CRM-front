import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService{

  createFillCredit(data: any) {
    console.log(data);
    return this.post('transactions/fill-credit/', data);
  }
}
