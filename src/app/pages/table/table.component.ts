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

          // Ensure latest_close_floot is initialized with all required fields
          if (!table.latest_close_floot) {
            table.latest_close_floot = {
              id: 0,
              close_flot: {quantity: 0},
              close_flot_total: 0,
              result: 0,
              close_date: null,
              status: "open",
              plaques: {quantity: 0},
              fill_credit: 0,
              created_at: new Date().toISOString(),
              updated_at: null,
              deleted_at: null
            };
          }

          Object.keys(table.open_flot).forEach(key => {
            this.closeFlotQuantities[table.id][key] = table.latest_close_floot.close_flot[key] || 0;
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
            if (res && res) {
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

  closeTable(tableId: number): void {
    const closeData: CloseFlotData = {
      table_id: tableId,  // Make sure to use 'table_id'
      game_day: this.gameDayId,
      close_flot: this.closeFlotQuantities[tableId]
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
}
