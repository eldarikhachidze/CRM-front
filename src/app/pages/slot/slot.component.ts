import {Component, OnInit} from '@angular/core';
import {SlotMachineService} from "../../core/services/slot-machine.service";
import {Router} from "@angular/router";
import {SlotMachine} from "../../core/interfaces/slot-machine";

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnInit {
  slotMachines: SlotMachine[] = [];  // Use SlotMachine interface for type safety
  displayedColumns: string[] = ['id', 'name', 'brand', 'bvbMoney', 'actions'];
  constructor(
    private slotMachineService: SlotMachineService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getSlotMachines();
  }

  getSlotMachines(): void {
    this.slotMachineService.getSlotMachines().subscribe((data) => {
      this.slotMachines = data;
    });
  }

  // Delete a slot machine by id
  deleteSlotMachine(id: number): void {
    this.slotMachineService.deleteSlotMachine(id).subscribe(() => {
      this.slotMachines = this.slotMachines.filter(machine => machine.id !== id);
    });
  }
}
