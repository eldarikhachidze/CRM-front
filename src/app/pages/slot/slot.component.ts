import {Component, OnInit} from '@angular/core';
import {SlotService} from "../../core/services/slot.service";
import {FullDatabaseResponse, Hall} from "../../core/interfaces/slot";
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
  slotPitData: FullDatabaseResponse = {halls: [], game_days: [], total_daily_amount: 0};
  gameDate: string = '';
  selectedDate: string = '';
  hallData: Hall[] = [];
  totalBvbMoney = 0

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

    this.slotService.getHalls(params).subscribe((data: Hall[]) => {
      this.hallData = data;
      console.log('hallData', this.hallData);
      this.totalBvbMoney = this.hallData.reduce((acc, hall) => acc + hall.daily_money_sum, 0);
    });
  }


  getBrandList(slot_machines_by_brand: any): Array<any> {
    return Object.keys(slot_machines_by_brand).map(key => ({
      name: key,
      count: slot_machines_by_brand[key].count,
      total_money: slot_machines_by_brand[key].total_money
    }));
  }

  getMaxBvbMoney(): number {
    let maxBvbMoney = 100;
    const totalBvbMoney = this.totalBvbMoney

    while (totalBvbMoney > maxBvbMoney) {
      maxBvbMoney *= 10;
    }

    return maxBvbMoney;
  }

  getTotalMoneyByDollar(): number {
    const res = this.totalBvbMoney / 2.70; // Declare the variable `res` using `const`
    return parseFloat(res.toFixed(2)); // Use `parseFloat` to convert the fixed string to a number
  }

  calculateStrokeDashArray(): string {
    const totalBvbMoney = this.totalBvbMoney
    const maxBvbMoney = this.getMaxBvbMoney();
    const percentage = (totalBvbMoney / maxBvbMoney) * 100;
    const strokeLength = 125.6;  // Approximate length of a half circle
    const filledLength = (strokeLength * percentage) / 100;
    return `${filledLength} ${strokeLength - filledLength}`;
  }

  getSlotsByHall(): void {
    this.slotService.getGameDayData().subscribe((data: FullDatabaseResponse) => {
      this.slotPitData = data;
      this.gameDate = this.slotPitData.game_days[0].date;
      console.log(this.slotPitData);
      console.log('gameDate', this.gameDate);
    });
  }

  close(id: number, bvbMoney: number): void {
    // Validate the bvbMoney input before proceeding
    if (!bvbMoney || isNaN(bvbMoney)) {
      this.notificationService.showError('Please enter the amount of BVB Money to close the slot machine.');
      return;
    }

    if (bvbMoney < 0) {
      this.notificationService.showError('Amount cannot be negative.');
      return;
    }

    // Proceed with the service call to close the slot machine
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

  submitDateRange(): void {
    const startDate = this.rankingForm.get('start')?.value;
    const endDate = this.rankingForm.get('end')?.value;

    const formattedStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : undefined;
    const formattedEndDate = endDate ? new Date(endDate).toISOString().split('T')[0] : undefined;

    this.getHallData(formattedStartDate, formattedEndDate);
  }


}
