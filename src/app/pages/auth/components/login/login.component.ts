import { Component } from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
    private authService: AuthService,
    private router: Router
    ) { }

  login(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.authService.login(this.form.value.username, this.form.value.password).subscribe(
      res => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/chip']);
      },
      err => {
        console.error(err);
      }
    );
  }
}
