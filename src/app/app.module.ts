import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TimesheetComponentComponent } from './component/timesheet-component/timesheet-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { UserprofilePageComponent } from './component/userprofile-page/userprofile-page.component';
import { UserprofileFormComponent } from './component/userprofile-form/userprofile-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserlistListComponent } from './component/userlist-list/userlist-list.component';
import { AddEventModalComponent } from './component/modal/add-event-modal/add-event-modal.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { ConfirmationDialogTwoComponent } from './component/modal/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddUserDialogComponent } from './component/modal/add-user-dialog/add-user-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { JwtInterceptor } from '@app/_helper/jwt.interceptor';
import { ContractPageComponent } from './component/contract-page/contract-page.component';
import { ContractListComponent } from './component/contract-list/contract-list.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { OfficelistPageComponent } from './component/officelist-page/officelist-page.component';
import { OfficelistListComponent } from './component/officelist-list/officelist-list.component';
import { CustomerOfficelistListComponent } from './component/customer-office/customerofficelist-list/customerofficelist-list.component';
import { CustomerOfficelistPageComponent } from './component/customer-office/customerofficelist-page/customerofficelist-page.component';
import { AddCustomerOfficeDialogComponent } from './component/modal-customer-office/add-dialog/add-dialog.component';
// tslint:disable-next-line: max-line-length
import { CustomerofficeprofileFormComponent } from './component/customer-office/customerofficeprofile-form/customerofficeprofile-form.component';
import { CustomerofficeprofilePageComponent } from './component/customer-office/customerofficeprofile-page/customerofficeprofile-page.component';
import { ConfirmationDialogComponent } from '@app/component/modal-customer-office/confirmation-dialog/confirmation-dialog.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomerPageComponent } from './component/customer-page/customer-page.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { ContractComponent } from './modules/contract/contract.component';
import { AddContractDialogComponent } from './modules/contract/modal/add-contract-dialog/add-contract-dialog.component';
import { ContractModule } from './modules/contract/contract.module';
import { CustomerComponent } from './modules/customer/customer.component';
import { CustomerModule } from './modules/customer/customer.module';
import { AddOfficeDialogComponent } from './modules/offices/modals/add-office-dialog/add-office-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetComponentComponent,
    SideBarComponent,
    UserprofilePageComponent,
    UserprofileFormComponent,
    UserlistListComponent,
    AddEventModalComponent,
    LoginPageComponent,
    ConfirmationDialogTwoComponent,
    AddUserDialogComponent,
    ConfirmationDialogComponent,
    ContractPageComponent,
    ContractListComponent,
    UserDetailComponent,
    OfficelistListComponent,
    OfficelistPageComponent,
    CustomerOfficelistListComponent,
    CustomerOfficelistPageComponent,
    AddCustomerOfficeDialogComponent,
    CustomerofficeprofileFormComponent,
    CustomerofficeprofilePageComponent,
    ConfirmationDialogComponent,
    CustomerPageComponent,
    CustomerListComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatExpansionModule,
    // My Module
    ContractModule,
    CustomerModule,
  ],
  exports: [
    SideBarComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  entryComponents: [AddEventModalComponent, AddUserDialogComponent, AddContractDialogComponent, AddOfficeDialogComponent ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
