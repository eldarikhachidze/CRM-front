import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TableService} from "../../../../core/services/table.service";
import {TransactionService} from "../../../../core/services/transaction.service";
import {NotificationService} from "../../../../core/services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fill-credit',
  templateUrl: './fill-credit.component.html',
  styleUrls: ['./fill-credit.component.scss']
})
export class FillCreditComponent implements OnInit {
  form: FormGroup;
  gameDayId: number = 0;
  hallData: any;
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
      table_id: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getTableData();
    this.getGameDay();
  }

  getTableData(): void {
    this.tableService.getHall().subscribe(data => {
      console.log(data);
      this.hallData = data;

      // Flatten the tables from each hall
      this.tables = this.hallData.flatMap((hall: { tables: any; }) => hall.tables);

      console.log(this.tables); // Now should show all tables
      this.filteredTables = this.tables; // Initialize filtered list
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

  onSubmit(): void {
    if (this.form.valid) {
      console.log("Form submitted with values:", this.form.value);

      const data = {
        table: this.form.value.table_id,          // Send the table ID
        game_day: this.gameDayId,              // Ensure you use the correct ID for the game day
        fill_credit: this.form.value.fillCredit     // Send the fill_credit value
      }

      console.log(data);

      // Send data to the API
      this.transactionService.createFillCredit(data).subscribe((res) => {
        console.log(res);
        this.notificationService.showSuccess("Fill credit successful");
        this.router.navigate(['/transaction/fill-credit']);
      }, (error) => {
        console.error(error);
        // Handle error
      });
    }
  }
}
