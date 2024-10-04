import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";
import {FullDatabaseResponse, GameDay, Hall, SlotPit} from "../interfaces/slot";

@Injectable({
  providedIn: 'root'
})
export class SlotService extends BaseService{


  getGameDay(): Observable<GameDay[]> {
    return this.get<GameDay[]>('slot/game_days');
  }

  createGameDay(data: any) {
    return this.post('slot/game_days', data);
  }

  getHalls(): Observable<Hall[]> {
    return this.get<Hall[]>('slot/halls/');
  }
  getGameDayData(): Observable<FullDatabaseResponse> {
    return this.get<FullDatabaseResponse>(`slot/full-database/`);
  }
}
