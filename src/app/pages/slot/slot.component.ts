import {Component, OnInit} from '@angular/core';
import {SlotService} from "../../core/services/slot.service";
import {FullDatabaseResponse} from "../../core/interfaces/slot";
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


  constructor(
    private slotService: SlotService,
    private slotMachineService: SlotMachineService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    this.getSlotsByHall()
  }

  getSlotsByHall(): void {
    this.slotService.getGameDayData().subscribe((data: FullDatabaseResponse) => {
      this.slotPitData = data;
      this.gameDate = this.slotPitData.game_days[0].date;
    });
  }

  close(id: number, bvbMoney: number): void {

    if (!bvbMoney || isNaN(bvbMoney)) {
      this.notificationService.showError('Please enter the amount of BVB Money to close the slot machine.');
      return;
    }
    console.log(id, bvbMoney)
    this.slotMachineService.closeSlotMachine(id, bvbMoney).subscribe(
      (res) => {
        if (res && res.success) {
          this.notificationService.showSuccess(res.message);
        } else {
          this.notificationService.showError('An unknown error occurred. Please try again.');
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
