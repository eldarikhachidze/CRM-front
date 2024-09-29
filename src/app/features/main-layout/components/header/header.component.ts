import { Component } from '@angular/core';
import {AuthFacadeService} from "../../../../core/facade/auth-facade.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  constructor(
    private authFacade: AuthFacadeService
  ) { }

  logout(): void {
    this.authFacade.logout();
  }
}
