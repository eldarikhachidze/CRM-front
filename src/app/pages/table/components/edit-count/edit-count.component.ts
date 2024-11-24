import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TableService} from "../../../../core/services/table.service";
import {NotificationService} from "../../../../core/services/notification.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-count',
  templateUrl: './edit-count.component.html',
  styleUrls: ['./edit-count.component.scss']
})
export class EditCountComponent implements OnInit {
  form: FormGroup;
  tableData: any;
  plaque_id!: number;

  constructor(
    private route: ActivatedRoute,
    private tableService: TableService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      plaques: this.fb.array([])
    });
  }

  ngOnInit() {
    this.plaque_id = this.route.snapshot.params['id'];
    this.loadPlaqueData();
  }

  get plaques(): FormArray {
    return this.form.get('plaques') as FormArray;
  }

  loadPlaqueData(): void {
    this.tableService.getPlaque(this.plaque_id).subscribe(
      res => {
        this.tableData = res;
        this.setPlaqueData(this.tableData.plaques);
      },
      error => {
        this.notificationService.showError(error.error.message);
      }
    )
  }

  setPlaqueData(plaques: { [key: string]: number }): void {
    Object.keys(plaques).forEach(key => {
      this.plaques.push(this.fb.group({
        denomination: [{value: key, disabled: true}],
        quantity: [plaques[key], Validators.required]
      }));
    });
  }

  updateCloseFloot() {
    if (this.form.valid) {
      const updatedPlaques = this.plaques.getRawValue().reduce((result: any, item: any) => {
        result[item.denomination] = item.quantity;
        return result;
      }, {});

      const updatedData = {
        plaque_id: this.plaque_id,
        game_day: this.tableData.game_day,
        plaques: updatedPlaques
      }

      this.tableService.updatePlaque(updatedData).subscribe(
        res => {
          this.notificationService.showSuccess(res.message);
          this.router.navigate(['/table']);
        },
        err => {
          this.notificationService.showError(err.error.error);
        }
      );
    }
  }
}
