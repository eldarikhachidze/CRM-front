import {Component, OnInit, ViewChild} from '@angular/core';
import {SlotService} from "../../core/services/slot.service";
import {FullDatabaseResponse, Hall, SlotPit} from "../../core/interfaces/slot";
import {SlotMachine} from "../../core/interfaces/slot-machine";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SlotMachineService} from "../../core/services/slot-machine.service";
import {NotificationService} from "../../core/services/notification.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnInit {
  slotPitData: FullDatabaseResponse = {halls: [], game_days: [], total_daily_amount: 0};
  slotMachines: SlotMachine[] = [];  // Use SlotMachine interface for type safety
  displayedColumns: string[] = ['name', 'brand', 'bvbMoney', 'actions'];
  hallData: Hall = {id: 0, slot_machines: [], daily_money_sum: 0, slot_machines_by_brand: [], name: '', created_at: ''};
  dataSource = new MatTableDataSource<{ brand: string, quantity: number, totalMoney: number }>();
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumnsForProgress: string[] = ['brand', 'quantity', 'totalMoney'];
  brandsWithData: Hall[] = [];


  constructor(
    private slotService: SlotService,
    private slotMachineService: SlotMachineService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    // this.getHallsWithSlotMachines()
    this.getSlotsByHall()
  }


  // getHallsWithSlotMachines(): void {
  //   this.slotService.getHallsWithSlotMachines().subscribe((data: Hall[]) => {
  //     this.halls = data;
  //     console.log(this.halls); // Logs the halls with slot machines
  //   });
  // }

  getSlotsByHall(): void {
    this.slotService.getGameDayData().subscribe((data: FullDatabaseResponse) => {
      this.slotPitData = data;
    });
  }


  getBrandList(slot_machines_by_brand: any): Array<any> {
    console.log(slot_machines_by_brand)
    return Object.keys(slot_machines_by_brand).map(key => ({
      name: key,
      count: slot_machines_by_brand[key].count,
      total_money: slot_machines_by_brand[key].total_money
    }));
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

  getSlotMachinesByBrand(brand: string) {
    console.log(brand)
  }


}
