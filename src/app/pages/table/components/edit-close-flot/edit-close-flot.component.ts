import {Component, OnInit} from '@angular/core';
import {TableService} from "../../../../core/services/table.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Chip, Latestclosefloot, Table} from "../../../../core/interfaces/table";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {of, switchMap} from "rxjs";
import {NotificationService} from "../../../../core/services/notification.service";
import {ChipService} from "../../../../core/services/chip.service";

@Component({
  selector: 'app-edit-close-flot',
  templateUrl: './edit-close-flot.component.html',
  styleUrls: ['./edit-close-flot.component.scss']
})
export class EditCloseFlotComponent implements OnInit {
  data: any;
  form: FormGroup;
  chipData: Chip[] = [];
  denominations: number[] = [1, 2.5, 5, 25, 100, 500, 1000, 5000, 10000];

  constructor(
    private fb: FormBuilder,
    private tableService: TableService,
    private notificationService: NotificationService,
    private chipService: ChipService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize form with an empty array for open_flot
    this.form = this.fb.group({
      id: <number | null>(null),
      name: [{value: '', disabled: true}],
      open_flot: this.fb.array([]), // Empty array initialization
      latest_close_floot: [{}],
      plaques: [{}],
    });
  }

  ngOnInit(): void {
    this.getChips(); // Assuming this is where you fetch the chips data

    this.route.params.pipe(
      switchMap(params => {
        if (params['id']) {
          return this.tableService.getTable(params['id']);
        }
        return of(null);
      })
    ).subscribe(res => {
      if (res) {
        this.data = res;
        this.form.patchValue({
          id: res.id,
          name: res.name,
          latest_close_floot: res.latest_close_floot || {},
          plaques: res.plaques || {},
        });

        this.initOpenFlotArray();
      }
    });
  }

  get openFlot(): FormArray {
    return this.form.get('open_flot') as FormArray;
  }

  getChips(): void {
    this.chipService.getChips().subscribe(data => {
      this.chipData = data;
    });
  }

  // Now called after data is set
  initOpenFlotArray(): void {
    const openFlotArray = this.form.get('open_flot') as FormArray;
    openFlotArray.clear(); // Clear existing controls to avoid duplicates

    // Populate open_flot array based on this.data
    this.denominations.forEach(denomination => {
      const quantity = this.data.open_flot?.[denomination] || 0;
      openFlotArray.push(this.fb.group({
        denomination: [{value: denomination, disabled: true}],
        quantity: [quantity, Validators.required]
      }));
    });
  }

  getCloseQuantity(denomination: number): number {
    return this.form.value.latest_close_floot?.close_flot[denomination] || 0;
  }

  getPlaqueQuantity(denomination: number): number {
    return this.form.value.plaques?.[denomination] || 0;
  }

  submit(): void {
    if (this.form.invalid) return;

    const closingFleetData = this.openFlot.controls.reduce((acc, control) => {
      const denomination = control.get('denomination')?.value;
      const quantity = this.getCloseQuantity(denomination); // Or use control.get('quantity')?.value if stored directly in the form
      acc[denomination] = quantity;
      return acc;
    }, {} as { [key: number]: number });

    console.log(closingFleetData);
  }
}
