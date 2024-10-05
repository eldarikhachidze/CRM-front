import {Component, OnInit} from '@angular/core';
import {SlotService} from "../../core/services/slot.service";
import {FullDatabaseResponse, Hall} from "../../core/interfaces/slot";
import {SlotMachineService} from "../../core/services/slot-machine.service";
import {NotificationService} from "../../core/services/notification.service";

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnInit {
  slotPitData: FullDatabaseResponse = {halls: [], game_days: [], total_daily_amount: 0};
  gameDate: string = '';
  hallData: Hall[] = [];
  totalBvbMoney = 0

  constructor(
    private slotService: SlotService,
    private slotMachineService: SlotMachineService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    this.getSlotsByHall()
    this.getHallData();
  }


  getHallData(): void {
    this.slotService.getHalls().subscribe((data: Hall[]) => {
      this.hallData = data;
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
    });
  }

  close(id: number, bvbMoney: number): void {
    // Validate the bvbMoney input before proceeding
    if (!bvbMoney || isNaN(bvbMoney)) {
      this.notificationService.showError('Please enter the amount of BVB Money to close the slot machine.');
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


}
