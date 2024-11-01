import {Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
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
    return this.post<any>('table/close-table/', data)
  }

  getTable(id: number): Observable<any> {
    return this.get<any>(`table/close-table/${id}/`)
  }

  updateCloseTable(id: number, data: any): Observable<any> {
    return this.put<any>(`table/close-table/${id}/`, data)
  }

  createGameDay(date: string): Observable<any> {
    return this.post<any>('table/create-game-day/', {date});
  }

  gameDayList(): Observable<GameDay> {
    return this.get<GameDay>('table/game-day/');
  }
}
