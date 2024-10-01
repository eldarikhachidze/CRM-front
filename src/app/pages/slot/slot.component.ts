import {Component, OnInit, ViewChild} from '@angular/core';
import {SlotMachineService} from "../../core/services/slot-machine.service";
import {SlotMachine} from "../../core/interfaces/slot-machine";
import {NotificationService} from "../../core/services/notification.service";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnInit {
  slotMachines: SlotMachine[] = [];  // Use SlotMachine interface for type safety
  displayedColumns: string[] = ['name', 'brand', 'bvbMoney', 'actions'];

  dataSource = new MatTableDataSource<{ brand: string, quantity: number, totalMoney: number }>();
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumnsForProgress: string[] = ['brand', 'quantity', 'totalMoney'];
  brandsWithData: { brand: string, quantity: number, totalMoney: number }[] = [];


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

      const brandDataMap: { [key: string]: { quantity: number, totalMoney: number } } = {};

      data.forEach(slotMachine => {
        const brand = slotMachine.brand;
        const bvbMoney = slotMachine.bvbMoney || 0;

        if (brandDataMap[brand]) {
          brandDataMap[brand].quantity++;
          brandDataMap[brand].totalMoney += bvbMoney;
        } else {
          brandDataMap[brand] = {
            quantity: 1,
            totalMoney: bvbMoney
          };
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

  getSlotMachinesByBrand(brand: string) {
    console.log(brand)
  }

  getTotalBvbMoney(): number {
    return this.slotMachines.reduce((total, slotMachine) => total + slotMachine.bvbMoney, 0);
  }

  getMaxBvbMoney(): number {
    let maxBvbMoney = 100;
    const totalBvbMoney = this.getTotalBvbMoney();

    while (totalBvbMoney > maxBvbMoney) {
      maxBvbMoney *= 10;
    }

    return maxBvbMoney;
  }

  calculateStrokeDashArray(): string {
    const totalBvbMoney = this.getTotalBvbMoney();
    const maxBvbMoney = this.getMaxBvbMoney();
    const percentage = (totalBvbMoney / maxBvbMoney) * 100;
    const strokeLength = 125.6;  // Approximate length of a half circle
    const filledLength = (strokeLength * percentage) / 100;
    return `${filledLength} ${strokeLength - filledLength}`;
  }
}
