import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {FullDatabaseResponse, GameDay, SlotHall} from "../interfaces/slot";

@Injectable({
  providedIn: 'root'
})
export class SlotService extends BaseService {


  getGameDay(): Observable<GameDay[]> {
    return this.get<GameDay[]>('slot/game_days');
  }

  createGameDay(data: any) {
    return this.post('slot/game_days', data);
  }

  getHalls(params: {}): Observable<SlotHall[]> {
    return this.get<SlotHall[]>('slot/halls/', params);
  }

  getGameDayData(): Observable<FullDatabaseResponse> {
    return this.get<FullDatabaseResponse>(`slot/game_date/`);
  }
}
