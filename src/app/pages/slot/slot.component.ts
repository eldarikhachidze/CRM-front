import {Component, OnInit} from '@angular/core';
import {SlotService} from "../../core/services/slot.service";
import {FullDatabaseResponse, SlotHall} from "../../core/interfaces/slot";
import {SlotMachineService} from "../../core/services/slot-machine.service";
import {NotificationService} from "../../core/services/notification.service";
import {GameDayService} from "../../core/services/game-day.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmLogoutDialogComponent} from "../components/confirm-logout-dialog/confirm-logout-dialog.component";

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnInit {
  rankingForm: FormGroup;
  slotPitData: FullDatabaseResponse = {halls: [], game_day: [], total_daily_amount: 0};
  gameDate: string = '';
  hallData: SlotHall[] = [];

  constructor(
    private slotService: SlotService,
    private slotMachineService: SlotMachineService,
    private notificationService: NotificationService,
    private gameDayService: GameDayService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.rankingForm = this.fb.group({
      start: [''],
      end: ['']
    });
  }

  ngOnInit() {
    this.getSlotsByHall()
    this.getHallData();
  }


  getHallData(startDate?: string, endDate?: string): void {
    const params = startDate && endDate ? {start_date: startDate, end_date: endDate} : {};

    this.slotService.getHalls(params).subscribe((data: SlotHall[]) => {
      this.hallData = data;
      console.log(this.hallData);
    });
  }


  getSlotsByHall(): void {
    this.slotService.getGameDayData().subscribe((data: FullDatabaseResponse) => {
      this.slotPitData = data;
      this.gameDate = this.slotPitData.game_day[0].date;
      console.log(this.slotPitData);
    });
  }

  getBrandList(slot_machines_by_brand: any): Array<any> {
    if (!slot_machines_by_brand) {
      return [];
    }
    return Object.keys(slot_machines_by_brand).map(key => ({
      name: key,
      count: slot_machines_by_brand[key].count,
      total_money: slot_machines_by_brand[key].total_money
    }));
  }

  getMaxBvbMoney(): number {
    let maxBvbMoney = 100;
    const totalBvbMoney = this.slotPitData.total_daily_amount;

    while (totalBvbMoney > maxBvbMoney) {
      maxBvbMoney *= 10;
    }

    return maxBvbMoney;
  }

  getTotalMoneyByDollar(total: number): number {
    const res = total / 2.70;
    return parseFloat(res.toFixed(2));
  }

  calculateStrokeDashArray(): string {
    const totalBvbMoney = this.slotPitData.total_daily_amount;
    const maxBvbMoney = this.getMaxBvbMoney();
    const percentage = (totalBvbMoney / maxBvbMoney) * 100;
    const strokeLength = 125.6;
    const filledLength = (strokeLength * percentage) / 100;
    return `${filledLength} ${strokeLength - filledLength}`;
  }

  close(id: number, bvbMoney: number): void {

    if (!bvbMoney || isNaN(bvbMoney)) {
      this.notificationService.showError('Please enter the amount of BVB Money to close the slot machine.');
      return;
    }

    if (bvbMoney < 0) {
      this.notificationService.showError('Amount cannot be negative.');
      return;
    }

    this.slotMachineService.closeSlotMachine(id, bvbMoney).subscribe(
      (res) => {
        if (res && res.message) {
          this.notificationService.showSuccess(res.message);
          this.getSlotsByHall()
          this.getHallData();
        }
      },
      (error) => {
        if (error.error && error.error.bvbMoney) {
          this.notificationService.showError(error.error.bvbMoney[0]);
        } else {
          this.notificationService.showError('An unknown error occurred. Please try again.');
        }
      }
    );
  }


  closeGameDay(date: any): void {
    console.log(date);
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent, {
      data: {
        contentText: 'Do you really want to Close the day?',
        confirmButtonText: 'Yes, Close'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gameDayService.closeGameDay(date).subscribe(
          (response) => {
            console.log(response);
            this.notificationService.showSuccess(response.message);
            this.getSlotsByHall()
            this.getHallData();
          },
          (error) => {
            this.notificationService.showError(error.error.message || "An error occurred");
          }
        );
      }
    });
  }

  formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  submitDateRange(): void {
    const startDate = this.rankingForm.get('start')?.value;
    const endDate = this.rankingForm.get('end')?.value;

    const formattedStartDate = startDate ? this.formatDateToYYYYMMDD(new Date(startDate)) : undefined;
    const formattedEndDate = endDate ? this.formatDateToYYYYMMDD(new Date(endDate)) : undefined;

    this.getHallData(formattedStartDate, formattedEndDate);
  }


  resetDateRange(): void {
    this.rankingForm.reset();
    this.getHallData();
  }

}
