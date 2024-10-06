import {Component} from '@angular/core';
import {AuthFacadeService} from "../../../../core/facade/auth-facade.service";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmLogoutDialogComponent
} from "../../../../pages/components/confirm-logout-dialog/confirm-logout-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  constructor(
    private dialog: MatDialog,
    private authFacade: AuthFacadeService
  ) {
  }

  logout(): void {
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent, {
      data: {
        contentText: 'Do you really want to Log out?',
        confirmButtonText: 'Yes, Log out'
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authFacade.logout();
      }
    });
  }
}
