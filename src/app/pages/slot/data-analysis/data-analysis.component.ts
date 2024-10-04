import {Component, OnInit} from '@angular/core';
import {SlotService} from "../../../core/services/slot.service";
import {Hall} from "../../../core/interfaces/slot";

@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.scss']
})
export class DataAnalysisComponent implements OnInit {
  hallData: Hall[] = [];
  constructor(
    private slotService: SlotService,

  ) {
  }

  ngOnInit() {
    this.getHallData();
  }

  getHallData(): void {
    this.slotService.getHalls().subscribe((data: Hall[]) => {
      this.hallData = data;
      console.log(this.hallData); // Logs the halls with slot machines
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
