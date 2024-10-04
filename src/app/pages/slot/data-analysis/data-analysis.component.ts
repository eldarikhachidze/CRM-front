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
  totalBvbMoney = 0

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
}
