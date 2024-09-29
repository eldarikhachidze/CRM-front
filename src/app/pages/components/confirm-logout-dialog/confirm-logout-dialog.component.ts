import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-logout-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
<!--    <h1 mat-dialog-title class="dialog-h1">Confirm Logout</h1>-->
    <div mat-dialog-content>Are you sure you want to log out?</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="warn" (click)="onConfirm()">Log out</button>
    </div>
  `,
})
export class ConfirmLogoutDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmLogoutDialogComponent>
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
