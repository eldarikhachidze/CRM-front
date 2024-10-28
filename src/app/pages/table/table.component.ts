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

          // Ensure latest_close_floot is initialized
          if (!table.latest_close_floot) {
            table.latest_close_floot = {
              close_flot: { quantity: 0 }, // Include any other required properties from OpenFlot
              close_flot_total: 0,         // Required property
              result: 0
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
      console.log(data.date);
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
            console.log(res);
            if (res && res) {
              this.notificationService.showSuccess(res.message);
              this.getTables();  // Refresh the tables if needed
              this.getGameDay(); // Refresh the game day list if needed
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

    console.log(tableId)
    const closeData: CloseFlotData = {
      table_id: tableId,  // Make sure to use 'table_id'
      game_day: this.gameDayId,
      close_flot: this.closeFlotQuantities[tableId]
    };
    console.log("Closing table with data:", closeData);
    this.tableService.closeTable(closeData).subscribe({
      next: (response) => {
        console.log("Table closed successfully:", response);
        this.notificationService.showSuccess(response.message);
        this.getTables(); // Refresh the tables if needed
      },
      error: (error) => {
        console.error("Error closing table:", error);
        this.notificationService.showError(error.error.message || "An error occurred");
      }
    });
  }
}
