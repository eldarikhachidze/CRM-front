import {Component, OnInit} from '@angular/core';
import {ChipService} from "../../core/services/chip.service";

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {

  constructor(private chipService: ChipService) {
  }

  ngOnInit(): void {
    this.getAllChip();
  }

  getAllChip() {
    this.chipService.getALlChip().subscribe(res => {
      console.log(res);
    });
  }
}
