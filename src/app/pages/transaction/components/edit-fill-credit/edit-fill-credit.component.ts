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
      table_name: ['', Validators.required],
      fillCredit: ['', Validators.required],
      action_date: [null, Validators.required],
      action_time: ['', [Validators.required, Validators.pattern('^([01]?[0-9]|2[0-3]):([0-5][0-9])$')]],
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
        const date = new Date(res.action_time);
        date.setHours(date.getHours() - 4);

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        this.form.patchValue({
          id: res.id,
          table_name: res.table,
          fillCredit: res.fill_credit,
          table_id: res.table,
          action_date: new Date(res.action_time),
          action_time: formattedTime
        });

        this.searchTerm = this.filteredTables.find(table => table.id === res.table)?.name || '';
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
    const actionDate = this.formatDateToYYYYMMDD(this.form.value.action_date);
    const actionTime = this.form.value.action_time ? this.form.value.action_time : null;

    const data = {
      table: this.form.value.table_id,
      game_day: this.gameDayId,
      fill_credit: this.form.value.fillCredit,
      action_time: actionTime ? `${actionDate} ${actionTime}` : undefined,
    }

    this.transactionService.updateFillCredit(this.form.value.id, data).subscribe((res) => {
      this.notificationService.showSuccess(res.message);
      this.router.navigate(['/transaction/fill-credit']);
    }, (error) => {
      this.notificationService.showError(error.error.message);
      }
    );
  }

  formatDateToYYYYMMDD(date: any): string {
    if (date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else {
      return '';
    }
  }

}
