import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {BaseService} from "./base.service";
import {GameDay, OpenFlot, TableHall} from "../interfaces/table";

@Injectable({
  providedIn: 'root'
})
export class TableService extends BaseService {

  getHall(): Observable<TableHall[]> {
    return this.get<TableHall[]>('table/hall/')
  }

  test(params: {}): Observable<TableHall[]> {
    return this.get<TableHall[]>('table/hall/', params)
  }

  getTable(id: number): Observable<any> {
    return this.get<any>(`table/delete/${id}/`)
  }

  closeTable(data: any): Observable<any> {
    return this.post<any>('table/close-table/', data)
  }

  getCloseFlot(id: number): Observable<any> {
    return this.get<any>(`table/close-table/${id}/`)
  }

  updateCloseTable(updatedData: any): Observable<any> {
    const id = updatedData.close_flot_id;
    const data = {
      close_flot_id: updatedData.close_flot_id,
      game_day: updatedData.game_day,
      close_flot: updatedData.close_flot
    };
    return this.put<any>(`table/close-table/${id}/`, data)
      .pipe(
        catchError(error => {
          return throwError(error)
        })
      )
  }


  closePlaque(data: any): Observable<any> {
    return this.post<any>('table/plaque/', data)
  }

  getPlaque(id: number): Observable<any> {
    return this.get<any>(`table/plaque/${id}/`)
  }

  updatePlaque(updatedData: any): Observable<any> {
    const id = updatedData.plaque_id;
    const data = {
      plaque_id: updatedData.plaque_id,
      game_day: updatedData.game_day,
      plaques: updatedData.plaques
    };
    return this.put<any>(`table/plaque/${id}/`, data)
      .pipe(
        catchError(error => {
          return throwError(error)
        })
      )
  }

  createGameDay(date: string): Observable<any> {
    return this.post<any>('table/create-game-day/', {date});
  }

  gameDayList(): Observable<GameDay> {
    return this.get<GameDay>('table/game-day/');
  }
}
