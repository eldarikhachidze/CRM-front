import {Component, OnInit} from '@angular/core';
import {TableService} from "../../../../core/services/table.service";
import {ActivatedRoute} from "@angular/router";
import {Latestclosefloot} from "../../../../core/interfaces/table";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {of, switchMap} from "rxjs";
import {KeyValue} from "@angular/common";

@Component({
  selector: 'app-edit-close-flot',
  templateUrl: './edit-close-flot.component.html',
  styleUrls: ['./edit-close-flot.component.scss']
})
export class EditCloseFlotComponent implements OnInit {
  form: FormGroup;
  tableData?: Latestclosefloot

  constructor(
    private tableService: TableService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      id: [null],
      closeFlotQuantities: this.fb.array([]), // Initialize with empty array
    });
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        if (id) {
          console.log(`Fetching table ID: ${id}`);
          return this.tableService.getTable(id);
        }
        return of(null);
      })
    ).subscribe(res => {
      if (res) {
        console.log('Received response:', res);
        this.tableData = res;

        // Populate your form array with the close_flot data
        this.populateCloseFlotFormArray();

        // Optionally patch other form values
        this.form.patchValue({id: res.id});
      }
    });
  }

  populateCloseFlotFormArray() {
    const closeFlotArray = this.form.get('closeFlotQuantities') as FormArray;
    closeFlotArray.clear(); // Clear existing controls

    if (this.tableData && this.tableData.close_flot) {
      Object.keys(this.tableData.close_flot).forEach(key => {
        const value = this.tableData?.close_flot[key] || 0; // Handle undefined values
        closeFlotArray.push(this.fb.control(value)); // Push value into FormArray
      });
    }
  }


  get closeFlotQuantities(): FormArray {
    return this.form.get('closeFlotQuantities') as FormArray;
  }

  sortKeys = (a: KeyValue<string, number>, b: KeyValue<string, number>): number => {
    return parseFloat(a.key) - parseFloat(b.key);
  };

  updateCloseFlot() {
    // Logic to save the updated values
  }
}
