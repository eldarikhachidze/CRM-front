import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-fill-credit',
  templateUrl: './fill-credit.component.html',
  styleUrls: ['./fill-credit.component.scss']
})
export class FillCreditComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,

  ) {
    this.form = this.fb.group({
      fillCredit: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit() {



  }
}
