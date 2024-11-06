import {Component, OnInit} from '@angular/core';
import {TableService} from "../../core/services/table.service";
import {CloseFlotData, TableHall} from "../../core/interfaces/table";
import {KeyValue} from "@angular/common";
import {ConfirmLogoutDialogComponent} from "../components/confirm-logout-dialog/confirm-logout-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../core/services/notification.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  hallData: TableHall[] = [];
  closeFlotQuantities: { [tableId: number]: { [denomination: string]: number } } = {};
  closePlaqueQuantities: { [tableId: number]: { [denomination: string]: number } } = {};
  gameDay: string = '';
  gameDayId: number = 0;

  constructor(
    private tableService: TableService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {
  }


  ngOnInit(): void {
    this.getTables();
    this.getGameDay();
  }

  getTables() {
    this.tableService.getHall().subscribe((data) => {
      this.hallData = data;

      this.hallData.forEach(hall => {
        hall.tables.forEach(table => {
          this.closeFlotQuantities[table.id] = {};
          this.closePlaqueQuantities[table.id] = {};

          if (!table.latest_close_floot) {
            table.latest_close_floot = {
              id: 0,
              close_flot: {quantity: 0},
              close_flot_total: 0,
              result: 0,
              close_date: null,
              status: "open",
              fill_credit: 0,
              created_at: new Date().toISOString(),
              updated_at: null,
              deleted_at: null
            };
          }

          if (!table.latest_plaque) {
            table.latest_plaque = {
              id: 0,
              plaques: {quantity: 0},
              plaques_total: 0,
              result: 0,
              status: "open",
              created_at: new Date().toISOString(),
              updated_at: null,
              deleted_at: null
            };
          }

          Object.keys(table.open_flot).forEach(key => {
            this.closeFlotQuantities[table.id][key] = table.latest_close_floot.close_flot[key] || 0;
            this.closePlaqueQuantities[table.id][key] = table.latest_plaque.plaques[key] || 0;
          });
        });
      });

      console.log(this.hallData);
    });
  }


  getGameDay() {
    this.tableService.gameDayList().subscribe((data) => {
      this.gameDay = data.date;
      this.gameDayId = data.id;
    });
  }


  createNewGameDay(currentGameDay: string) {
    console.log(currentGameDay);

    // Parse the current game day date
    const currentDate = new Date(currentGameDay);

    // Add one day to the current game day
    currentDate.setDate(currentDate.getDate() + 1);

    // Format the new date back to YYYY-MM-DD
    const newGameDay = currentDate.toISOString().split('T')[0];

    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent, {
      data: {
        contentText: 'Do you really want to create a new game day?',
        confirmButtonText: 'Yes, Create'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableService.createGameDay(newGameDay).subscribe(
          (res) => {
            if (res && res.message) {
              this.notificationService.showSuccess(res.message);
              this.getTables();
              this.getGameDay();
            }
          },
          (error) => {
            this.notificationService.showError(error.error.message);
          }
        );
      }
    });
  }


  sortKeys = (a: KeyValue<string, number>, b: KeyValue<string, number>): number => {
    return parseFloat(a.key) - parseFloat(b.key);
  };

  closeTable(id: number): void {
    const closeData: CloseFlotData = {
      table_id: id,
      game_day: this.gameDayId,
      close_flot: this.closeFlotQuantities[id]
    };

    this.tableService.closeTable(closeData).subscribe({
      next: (response) => {
        this.notificationService.showSuccess(response.message);
        this.getTables(); // Refresh the tables if needed
      },
      error: (error) => {
        console.log('Error response:', error); // Log the entire error response for debugging

        console.log('Error message:', error.error.error); // Log the error message for debugging
        this.notificationService.showError(error.error.error);
      }
    });
  }

  editTable(id: number) {
    console.log('Edit table:', id);

  }

  closePlaque(id: number) {
    const plaqueData = {
      table_id: id,
      game_day: this.gameDayId,
      plaques: this.closePlaqueQuantities[id],
    };

    console.log('Close plaque:', plaqueData);

    this.tableService.closePlaque(plaqueData).subscribe({
      next: (response) => {
        this.notificationService.showSuccess(response.message);
        this.getTables(); // Refresh the tables if needed
      },
      error: (error) => {
        console.log('Error response:', error); // Log the entire error response for debugging

        console.log('Error message:', error.error.error); // Log the error message for debugging
        this.notificationService.showError(error.error.error);
      }
    });
  }

}
