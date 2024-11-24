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
  close_flot_id!: number;

  constructor(
    private fb: FormBuilder,
    private tableService: TableService,
    private notifyService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      close_flot: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.close_flot_id = this.route.snapshot.params['id'];
    this.loadCloseFlotData();
  }

  get closeFlot(): FormArray {
    return this.form.get('close_flot') as FormArray;
  }

  loadCloseFlotData(): void {
    this.tableService.getCloseFlot(this.close_flot_id).subscribe(
      res => {
        this.tableData = res;
        this.setCloseFlotData(this.tableData.close_flot);
      },
      error => {
        this.notifyService.showError(error.error.message);
      }
    );
  }

  setCloseFlotData(closeFlotData: { [key: string]: number }): void {
    Object.keys(closeFlotData).forEach(key => {
      this.closeFlot.push(this.fb.group({
        denomination: [{value: key, disabled: true}],
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
        close_flot_id: this.close_flot_id,
        game_day: this.tableData.game_day,
        close_flot: updatedCloseFloot
      };

      this.tableService.updateCloseTable(updatedData).subscribe(
        res => {
          this.notifyService.showSuccess(res.message);
          this.router.navigate(['/table']);
        },
        error => {
          this.notifyService.showError(error.error.error);
        }
      );
    }
  }

}
