import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// import { HomeComponent } from './page/layout/content/home/home.component';
// import { AdminComponent } from './admin/admin.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { LoginComponent } from './page/layout/content/login/login.component';
import { LogoutComponent } from './page/layout/content/logout/logout.component';
import { RegisterComponent } from './page/layout/content/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptor} from "./auth.interceptor";
import { RefreshTokenComponent } from './page/layout/content/refresh-token/refresh-token.component';
// import {GlobalErrorHandlerService} from "./global-error-handler.service";
// import { AdminProductComponent } from './admin/layout/content/admin-product/admin-product.component';
// import { AdminCategoryComponent } from './admin/layout/content/admin-category/admin-category.component';
// import { AdminFlavorComponent } from './admin/layout/content/admin-flavor/admin-flavor.component';
// import { AdminHeaderComponent } from './admin/layout/header/admin-header.component';
// import { SideNavComponent } from './admin/layout/side-nav/side-nav.component';
// import { AdminHomeComponent } from './admin/layout/content/admin-home/admin-home.component';
// import { PageComponent } from './page/page.component';
// import { TopWidgetsComponent } from './admin/layout/content/admin-home/top-widgets/top-widgets.component';
// import { SalesByCategoryComponent } from './admin/layout/content/admin-home/sales-by-category/sales-by-category.component';
// import { SalesByMonthComponent } from './admin/layout/content/admin-home/sales-by-month/sales-by-month.component';
// import { LastFewTransactionsComponent } from './admin/layout/content/admin-home/last-few-transactions/last-few-transactions.component';
// import { TopThreeProductsComponent } from './admin/layout/content/admin-home/top-three-products/top-three-products.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ChartModule, HIGHCHARTS_MODULES} from "angular-highcharts";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {CdkMenuTrigger} from "@angular/cdk/menu";
import {MatTreeModule} from "@angular/material/tree";
import {MatExpansionModule} from "@angular/material/expansion";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
// import { AdminCategoryDialogComponent } from './admin/layout/content/admin-category/admin-category-dialog/admin-category-dialog.component';
// import { StatusConvertPipe } from './admin/pipe/status-convert.pipe';
// import { AdminConfirmationDialogComponent } from './admin/layout/content/reusable/admin-confirmation-dialog/admin-confirmation-dialog.component';
// import { AdminFlavorDialogComponent } from './admin/layout/content/admin-flavor/admin-flavor-dialog/admin-flavor-dialog.component';
// import { AdminProductDialogComponent } from './admin/layout/content/admin-product/admin-product-dialog/admin-product-dialog.component';
// import { AdminSaleComponent } from './admin/layout/content/admin-sale/admin-sale.component';
// import { AdminSaleDialogComponent } from './admin/layout/content/admin-sale/admin-sale-dialog/admin-sale-dialog.component';
// import {MomentDateAdapter} from "@angular/material-moment-adapter";
// import {AngularFireModule} from "@angular/fire/compat";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MY_DATE_FORMAT} from "./shared/utils/config"
import {MomentUtcDateAdapter} from "./shared/utils/date-format";
import {environment} from "../environments/environment"
// import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
// import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {FirebaseAppModule, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getStorage, provideStorage, StorageModule} from "@angular/fire/storage";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

import * as firebase from '@firebase/app';
import {NgOptimizedImage} from "@angular/common";
// import { AdminUserDialogComponent } from './admin/layout/content/admin-user/admin-user-dialog/admin-user-dialog.component';
// import { AdminEmployeeComponent } from './admin/layout/content/admin-employee/admin-employee.component';
// import { AdminEmployeeDialogComponent } from './admin/layout/content/admin-employee/admin-employee-dialog/admin-employee-dialog.component';
// import {AdminUserComponent} from "./admin/layout/content/admin-user/admin-user.component";
// import { AdminProductImageComponent } from './admin/layout/content/admin-product-image/admin-product-image.component';
// import { AdminProductImageDialogComponent } from './admin/layout/content/admin-product-image/admin-product-image-dialog/admin-product-image-dialog.component';
// import { AdminProfileComponent } from './admin/layout/content/admin-profile/admin-profile.component';
// import { ObjectToValuePipe } from './admin/pipe/object-to-value.pipe';
// import {AdminLoginComponent} from "./admin/layout/content/admin-login/admin-login.component";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import { ResetPasswordComponent } from './page/layout/content/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './page/layout/content/forgot-password/forgot-password.component';
// import { FooterComponent } from './page/layout/footer/footer.component';
import {AdminModule} from "./admin/admin.module";
import {PageModule} from "./page/page.module";
import {RouterModule} from "@angular/router";

firebase.initializeApp(environment.firebaseConfig)
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    HttpClientModule,
    AppRoutingModule,
    AdminModule,
    PageModule,
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
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB'
    },
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE]
    // },
    {
      provide: DateAdapter,
      useClass: MomentUtcDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMAT
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
