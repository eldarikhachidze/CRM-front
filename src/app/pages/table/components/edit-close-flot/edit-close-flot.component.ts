import {Component, OnInit} from '@angular/core';
import {TableService} from "../../../../core/services/table.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../../core/services/notification.service";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-edit-close-flot',
  templateUrl: './edit-close-flot.component.html',
  styleUrls: ['./edit-close-flot.component.scss']
})
export class EditCloseFlotComponent implements OnInit {
  form: FormGroup;
  tableData: any;
  tableId!: number;

  constructor(
    private fb: FormBuilder,
    private tableService: TableService,
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required],
      close_flot: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.tableId = +this.route.snapshot.paramMap.get('id')!;
    this.loadTableData();
  }

  get closeFlot(): FormArray {
    return this.form.get('close_flot') as FormArray;
  }

  loadTableData(): void {
    this.tableService.getTable(this.tableId).subscribe(data => {
      this.tableData = data;
      this.form.patchValue({ name: data.name });
      this.setCloseFlotData(data.latest_close_floot.close_flot);
    });
  }

  setCloseFlotData(closeFlotData: { [key: string]: number }): void {
    Object.keys(closeFlotData).forEach(key => {
      this.closeFlot.push(this.fb.group({
        denomination: [{ value: key, disabled: true }],
        quantity: [closeFlotData[key], Validators.required]
      }));
    });
  }

  sortKeys = (a: KeyValue<string, number>, b: KeyValue<string, number>): number => {
    return parseFloat(a.key) - parseFloat(b.key);
  };

  updateCloseFloot(): void {
    if (this.form.valid) {
      const updatedCloseFloot = this.closeFlot.getRawValue().reduce((result: any, item: any) => {
        result[item.denomination] = item.quantity;
        return result;
      }, {});

      const updatedData = {
        table_id: this.tableId,
        game_day: this.tableData.latest_close_floot.game_day,
        close_flot: updatedCloseFloot
      };

      console.log('Updated Data:', updatedData); // Log to check the data structure

      this.tableService.updateCloseTable(updatedData).subscribe(
        res => {
          this.notifyService.showSuccess(res.message);
          this.router.navigate(['/table']);
        },
        error => {
          console.error('Error updating Close Float data', error);
        }
      );
    }
  }


}
