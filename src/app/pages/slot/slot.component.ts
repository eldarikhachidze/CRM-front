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

  dataSource = new MatTableDataSource<{ brand: string, quantity: number, totalMoney: number }>();
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumnsForProgress: string[] = ['brand', 'quantity', 'totalMoney'];
  brandsWithData: { brand: string, quantity: number, totalMoney: number }[] = [];


  constructor(
    private slotService: SlotService,
    private slotMachineService: SlotMachineService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    // this.getHallsWithSlotMachines()
    this.getSlotHallData()
  }


  // getHallsWithSlotMachines(): void {
  //   this.slotService.getHallsWithSlotMachines().subscribe((data: Hall[]) => {
  //     this.halls = data;
  //     console.log(this.halls); // Logs the halls with slot machines
  //   });
  // }

  getSlotHallData(): void {
    this.slotService.getGameDayData().subscribe((data: FullDatabaseResponse) => {
      this.slotPitData = data;
      console.log(data); // This will log an object with halls and game_days arrays
      console.log(this.slotPitData); // This will log an object with halls and game_days arrays
    });
  }


  getSlotMachines(): void {
    this.slotMachineService.getSlotMachines().subscribe((data) => {
      this.slotMachines = data;

      const brandDataMap: { [key: string]: { quantity: number, totalMoney: number } } = {};

      data.forEach(slotMachine => {
        const brand = slotMachine.brand;
        // const bvbMoney = slotMachine.bvbMoney || 0;

        if (brandDataMap[brand]) {
          brandDataMap[brand].quantity++;
          // brandDataMap[brand].totalMoney += bvbMoney;
        }

      });


      this.brandsWithData = Object.keys(brandDataMap).map(brand => ({
        brand,
        quantity: brandDataMap[brand].quantity,
        totalMoney: brandDataMap[brand].totalMoney
      }));

      this.dataSource = new MatTableDataSource(this.brandsWithData);
      this.dataSource.sort = this.sort;
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

  getSlotMachinesByBrand(brand: string) {
    console.log(brand)
  }

  getMaxBvbMoney(): number {
    let maxBvbMoney = 100;
    const totalBvbMoney = 1000

    while (totalBvbMoney > maxBvbMoney) {
      maxBvbMoney *= 10;
    }

    return maxBvbMoney;
  }

  calculateStrokeDashArray(): string {
    const totalBvbMoney = 1000
    const maxBvbMoney = this.getMaxBvbMoney();
    const percentage = (totalBvbMoney / maxBvbMoney) * 100;
    const strokeLength = 125.6;  // Approximate length of a half circle
    const filledLength = (strokeLength * percentage) / 100;
    return `${filledLength} ${strokeLength - filledLength}`;
  }
}
