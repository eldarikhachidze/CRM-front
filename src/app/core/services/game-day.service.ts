import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {GameDay} from "../interfaces/slot";

@Injectable({
  providedIn: 'root'
})
export class GameDayService extends BaseService {

  closeGameDay(currentDate: string): Observable<any> {
    return this.post('slot/game-days/', { date: currentDate });
  }
}
