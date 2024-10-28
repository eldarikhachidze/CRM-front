import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {MainLayoutModule} from "./features/main-layout/main-layout.module";
import {AuthComponent} from './pages/auth/auth.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {ConfirmLogoutDialogComponent} from "./pages/components/confirm-logout-dialog/confirm-logout-dialog.component";
import {TransactionModule} from "./pages/transaction/transaction.module";
import { TableComponent } from './pages/table/table.component';
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    MainLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,  // Important for Material components
    MatToolbarModule,  // Add Material modules here
    MatButtonModule,
    MatTableModule,
    ConfirmLogoutDialogComponent,
    BrowserAnimationsModule,  // Required for MatSnackBar animations
    MatSnackBarModule, // Required for MatSnackBar
    TransactionModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
