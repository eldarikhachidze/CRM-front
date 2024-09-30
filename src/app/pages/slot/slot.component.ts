import {Component, OnInit} from '@angular/core';
import {SlotMachineService} from "../../core/services/slot-machine.service";
import {SlotMachine} from "../../core/interfaces/slot-machine";
import {NotificationService} from "../../core/services/notification.service";

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnInit {
  slotMachines: SlotMachine[] = [];  // Use SlotMachine interface for type safety
  displayedColumns: string[] = ['name', 'brand', 'bvbMoney', 'actions'];

  constructor(
    private slotMachineService: SlotMachineService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    this.getSlotMachines();
  }

  getSlotMachines(): void {
    this.slotMachineService.getSlotMachines().subscribe((data) => {
      this.slotMachines = data;
    });
  }

  close(id: number, bvbMoney: number): void {

    if (!bvbMoney || isNaN(bvbMoney)) {
      this.notificationService.showError('Please enter the amount of BVB Money to close the slot machine.');
      return;
    }

    this.slotMachineService.closeSlotMachine(id, bvbMoney).subscribe(
      (res) => {
        if (res && res.success) {
          this.notificationService.showSuccess(res.message);
        } else {
          this.notificationService.showError('An unknown error occurred. Please try again.');
        }
        this.getSlotMachines();
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
