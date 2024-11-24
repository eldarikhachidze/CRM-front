import {Component, OnInit} from '@angular/core';
import {TableService} from "../../core/services/table.service";
import {CloseFlotData, TableHall} from "../../core/interfaces/table";
import {KeyValue} from "@angular/common";
import {ConfirmLogoutDialogComponent} from "../components/confirm-logout-dialog/confirm-logout-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../core/services/notification.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  form: FormGroup;
  hallData: TableHall[] = [];
  closeFlotQuantities: { [tableId: number]: { [denomination: string]: number } } = {};
  closePlaqueQuantities: { [tableId: number]: { [denomination: string]: number } } = {};
  gameDay: string = '';
  gameDayId: number = 0;

  constructor(
    private tableService: TableService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      date: [''],
    });
  }


  ngOnInit(): void {
    this.getTables();
    this.getGameDay();
  }

  getTables(paramsDate?: string) {
    const params = paramsDate ? {date: paramsDate} : {};
    this.tableService.test(params).subscribe((data) => {
      this.hallData = data;

      this.hallData.forEach(hall => {
        hall.tables.forEach(table => {
          this.closeFlotQuantities[table.id] = {};
          this.closePlaqueQuantities[table.id] = {};

          Object.keys(table.open_flot).forEach(key => {
            this.closeFlotQuantities[table.id][key] = table.close_flot[key] || 0;
            this.closePlaqueQuantities[table.id][key] = table.plaques[key] || 0;
          });

          if (table.close_date) {
            const adjustedTime = new Date(table.close_date);
            adjustedTime.setHours(adjustedTime.getHours() - 4);
            table.close_date = adjustedTime.toISOString()
          }

          if (table.close_date_updated) {
            const adjustedTime = new Date(table.close_date_updated);
            adjustedTime.setHours(adjustedTime.getHours() - 4);
            table.close_date_updated = adjustedTime.toISOString()
          }
        });
      });
    });
  }


  getGameDay() {
    this.tableService.gameDayList().subscribe((data) => {
      this.gameDay = data.date;
      this.gameDayId = data.id;
    });
  }


  createNewGameDay(currentGameDay: string) {
    const currentDate = new Date(currentGameDay);

    currentDate.setDate(currentDate.getDate() + 1);

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
    return parseFloat(b.key) - parseFloat(a.key);
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
        this.getTables();
      },
      error: (error) => {
        this.notificationService.showError(error.error.error);
      }
    });
  }

  closePlaque(id: number) {
    const plaqueData = {
      table_id: id,
      game_day: this.gameDayId,
      plaques: this.closePlaqueQuantities[id],
    };

    this.tableService.closePlaque(plaqueData).subscribe({
      next: (response) => {
        this.notificationService.showSuccess(response.message);
        this.getTables();
      },
      error: (error) => {
        this.notificationService.showError(error.error.error);
      }
    });
  }

  submitDateRange() {
    const date = this.form.get('date')?.value;
    const formattedDate = date ? this.formatDateToYYYYMMDD(new Date(date)) : undefined;

    this.getTables(formattedDate);
  }

  resetDateRange() {
    this.form.patchValue({start: null, end: null});
    this.getTables();
  }

  formatDateToYYYYMMDD(date: any): string {
    if (date) {
      const d = new Date(date); // Ensure it's a valid date object
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else {
      return '';
    }
  }
}
