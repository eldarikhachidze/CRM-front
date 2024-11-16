import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FillCredit} from "../../../../core/interfaces/transaction";
import {TransactionService} from "../../../../core/services/transaction.service";
import {TableService} from "../../../../core/services/table.service";
import {NotificationService} from "../../../../core/services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {of, switchMap} from "rxjs";

@Component({
  selector: 'app-edit-fill-credit',
  templateUrl: './edit-fill-credit.component.html',
  styleUrls: ['./edit-fill-credit.component.scss']
})
export class EditFillCreditComponent implements OnInit{
  form: FormGroup;
  gameDayId: number = 0;
  hallData: any;
  fillCredit: FillCredit[] = [];
  tables: any[] = [];
  filteredTables: any[] = [];
  searchTerm: string = '';

  constructor(
    private fb: FormBuilder,
    private tableService: TableService,
    private transactionService: TransactionService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      table_id: ['', Validators.required],
      fillCredit: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTables();
    this.getGameDay();

    this.route.params.pipe(
      switchMap(params => {
        if (params['id']) {
          return this.transactionService.getFillCredit(params['id']);
        }
        return of(null);
      })
    ).subscribe(res => {
      if (res) {
        console.log('res', res);
        this.form.patchValue({
          id: res.id,
          fillCredit: res.fill_credit,
          table_id: res.table,
        });
      }
    });
  }

  loadTables(): void {
    this.tableService.getHall().subscribe(data => {
      this.hallData = data;
      this.tables = this.hallData.flatMap((hall: { tables: any; }) => hall.tables);
      this.filteredTables = this.tables;
    });
  }

  getGameDay(): void {
    this.tableService.gameDayList().subscribe((data: any) => {
      this.gameDayId = data.id
    });
  }

  filterTables(): void {
    this.filteredTables = this.tables.filter(table =>
      table.id.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSubmit() {
    const data = {
      table: this.form.value.table_id,
      game_day: this.gameDayId,
      fill_credit: this.form.value.fillCredit
    }

    console.log(data);
    console.log(this.form.value.id);
    this.transactionService.updateFillCredit(this.form.value.id, data).subscribe((res) => {
      this.notificationService.showSuccess('Fill Credit updated successfully');
      this.router.navigate(['/transaction/fill-credit']);
    });
  }
}
