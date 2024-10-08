import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameDayService extends BaseService {

  closeGameDay(currentDate: string): Observable<any> {
    return this.post('slot/close-game-day/', {date: currentDate});
  }
}
