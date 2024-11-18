import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TableService} from "../../../../core/services/table.service";
import {TransactionService} from "../../../../core/services/transaction.service";
import {NotificationService} from "../../../../core/services/notification.service";
import {Router} from "@angular/router";
import {FillCredit} from "../../../../core/interfaces/transaction";

@Component({
  selector: 'app-fill-credit',
  templateUrl: './fill-credit.component.html',
  styleUrls: ['./fill-credit.component.scss']
})
export class FillCreditComponent implements OnInit {
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
  ) {
    this.form = this.fb.group({
      fillCredit: ['', Validators.required],
      table_id: ['', Validators.required],
      start: [null],
      end: [null],
    });
  }

  ngOnInit() {
    this.getTableData();
    this.getGameDay();
    this.getFillCredit();
  }

  getTableData(): void {
    this.tableService.getHall().subscribe(data => {
      this.hallData = data;
      this.tables = this.hallData.flatMap((hall: { tables: any; }) => hall.tables);
      this.filteredTables = this.tables;
    });
  }

  getFillCredit(startDate?: string, endDate?: string): void {
    const params = startDate && endDate ? {start_date: startDate, end_date: endDate} : {};

    this.transactionService.getFillCredits(params).subscribe((data) => {
        this.fillCredit = data;
      },
      (error) => {
        this.notificationService.showError(error.error.message);
      }
    );
  }


  submitDateRange() {
    const startDate = this.form.get('start')?.value;
    const endDate = this.form.get('end')?.value;

    const formattedStartDate = startDate ? this.formatDateToYYYYMMDD(new Date(startDate)) : undefined;
    const formattedEndDate = endDate ? this.formatDateToYYYYMMDD(new Date(endDate)) : undefined;

    this.getFillCredit(formattedStartDate, formattedEndDate);
  }

  resetDateRange() {
    this.form.patchValue({start: null, end: null});
    this.getFillCredit();
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

  onSubmit(): void {

    const data = {
      table: this.form.value.table_id,
      game_day: this.gameDayId,
      fill_credit: this.form.value.fillCredit
    }

    this.transactionService.createFillCredit(data).subscribe((res) => {
      this.notificationService.showSuccess(res.message);
      this.getFillCredit();
    }, (error) => {
      this.notificationService.showError(error.error.error);
    });
  }

  delete(id: number): void {
    this.transactionService.deleteFillCredit(id).subscribe((res) => {
      this.notificationService.showSuccess(res.message);
      this.getFillCredit();
    }, (error) => {
      this.notificationService.showError(error.error.message);
    });
  }

  formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0'); // Get the day

    return `${year}-${month}-${day}`;
  }
}
