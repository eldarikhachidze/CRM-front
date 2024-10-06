import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-confirm-logout-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <div mat-dialog-content>
      {{ data.contentText }}
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="warn" (click)="onConfirm()">{{ data.confirmButtonText }}</button>
    </div>
  `,
})
export class ConfirmLogoutDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmLogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contentText: string, confirmButtonText: string }
  ) {
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
