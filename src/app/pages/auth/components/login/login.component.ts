import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthFacadeService} from "../../../../core/facade/auth-facade.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private authFacade: AuthFacadeService,
    private router: Router
    ) { }

  login(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.authFacade.login(this.form.value).subscribe(response => {
      this.authFacade.handleLoginResponse(response);
    });
  }
}
