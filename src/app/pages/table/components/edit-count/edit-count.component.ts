import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TableService} from "../../../../core/services/table.service";
import {NotificationService} from "../../../../core/services/notification.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {of, switchMap} from "rxjs";

@Component({
  selector: 'app-edit-count',
  templateUrl: './edit-count.component.html',
  styleUrls: ['./edit-count.component.scss']
})
export class EditCountComponent implements OnInit {
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private tableService: TableService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      id: <number | null>(null),
      name: [{value: '', disabled: true}, Validators.required],
      game_day: [{value: '', disabled: true}],
      plaques: this.fb.array([])
    });
  }


  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        if (params['id']) {
          return this.tableService.getTable(params['id']);
        }
        return of(null);
      })
    ).subscribe(res => {
      if (res) {
        this.form.patchValue({
          id: res.id,
          name: res.name,
          game_day: res.latest_plaque?.game_day,
        });

        this.setPlaqueData(res.latest_plaque.plaques);
      }
    });
  }


  get plaques(): FormArray {
    return this.form.get('plaques') as FormArray;
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
        table_id: this.form.value.id,
        game_day: this.form.controls['game_day'].value,
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
