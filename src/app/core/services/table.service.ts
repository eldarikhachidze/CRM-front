import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {BaseService} from "./base.service";
import {GameDay, TableHall} from "../interfaces/table";

@Injectable({
  providedIn: 'root'
})
export class TableService extends BaseService {

  getHall(): Observable<TableHall[]> {
    return this.get<TableHall[]>('table/hall/')
  }

  closeTable(data: any): Observable<any> {
    console.log(data);
    return this.post<any>('table/close-table/', data)
  }

  createGameDay(date: string): Observable<any> {
    return this.post<any>('table/create-game-day/', { date });
  }

  gameDayList(): Observable<GameDay> {
    return this.get<GameDay>('table/game-day/');
  }
}
