import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AdminComponent } from './admin/admin.component';
import { ManagementComponent } from './management/management.component';
import {AppRoutingModule} from "./app-routing.module";
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { RegisterComponent } from './authentication/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {GlobalErrorHandlerService} from "./global-error-handler.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptor} from "./auth.interceptor";
import { RefreshTokenComponent } from './authentication/refresh-token/refresh-token.component';
import { ProductComponent } from './admin/product/product.component';
import { CategoryComponent } from './admin/category/category.component';
import { FlavorComponent } from './admin/flavor/flavor.component';
import { HeaderComponent } from './admin/header/header.component';
import { SideNavComponent } from './admin/side-nav/side-nav.component';
import { MainComponent } from './admin/main/main.component';
import { PageComponent } from './page/page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopWidgetsComponent } from './admin/main/top-widgets/top-widgets.component';
import { SalesByCategoryComponent } from './admin/main/sales-by-category/sales-by-category.component';
import { SalesByMonthComponent } from './admin/main/sales-by-month/sales-by-month.component';
import { LastFewTransactionsComponent } from './admin/main/last-few-transactions/last-few-transactions.component';
import { TopThreeProductsComponent } from './admin/main/top-three-products/top-three-products.component';
import {ChartModule, HIGHCHARTS_MODULES} from "angular-highcharts";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {CdkMenuTrigger} from "@angular/cdk/menu";
import {MatTreeModule} from "@angular/material/tree";
import {MatExpansionModule} from "@angular/material/expansion";
import { CategoryDialogComponent } from './admin/category/category-dialog/category-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { StatusConvertPipe } from './admin/status-convert.pipe';
import { ConfirmationDialogComponent } from './admin/reusable/confirmation-dialog/confirmation-dialog.component';
import { FlavorDialogComponent } from './admin/flavor/flavor-dialog/flavor-dialog.component';
import { ProductDialogComponent } from './admin/product/product-dialog/product-dialog.component';
import { SaleComponent } from './admin/sale/sale.component';
import { SaleDialogComponent } from './admin/sale/sale-dialog/sale-dialog.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {MY_DATE_FORMAT} from "./shared/utils/config"
import {MomentUtcDateAdapter} from "./shared/utils/date-format";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment"
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {getStorage, provideStorage, StorageModule} from "@angular/fire/storage";
import {FirebaseAppModule, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

import * as firebase from '@firebase/app';
import {NgOptimizedImage} from "@angular/common";
import { UserDialogComponent } from './admin/user/user-dialog/user-dialog.component';
import { EmployeeComponent } from './admin/employee/employee.component';
import { EmployeeDialogComponent } from './admin/employee/employee-dialog/employee-dialog.component';

firebase.initializeApp(environment.firebaseConfig)
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    ManagementComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    RefreshTokenComponent,
    ProductComponent,
    CategoryComponent,
    FlavorComponent,
    HeaderComponent,
    SideNavComponent,
    MainComponent,
    PageComponent,
    TopWidgetsComponent,
    SalesByCategoryComponent,
    SalesByMonthComponent,
    LastFewTransactionsComponent,
    TopThreeProductsComponent,
    CategoryDialogComponent,
    StatusConvertPipe,
    ConfirmationDialogComponent,
    FlavorDialogComponent,
    ProductDialogComponent,
    SaleComponent,
    SaleDialogComponent,
    UserDialogComponent,
    EmployeeComponent,
    EmployeeDialogComponent
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    FontAwesomeModule,
    ChartModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    CdkMenuTrigger,
    MatTreeModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgOptimizedImage,
  ],
  providers: [
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandlerService
    // },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue:{}
    },
    {
      provide: MAT_DATE_LOCALE, useValue: 'en-GB'
    },
    // {
    //   provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]
    // },
    {
      provide: DateAdapter, useClass: MomentUtcDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
