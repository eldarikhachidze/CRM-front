import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './components/login/login.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
}
