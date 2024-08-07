import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import {AdminProductComponent} from "./layout/content/admin-product/admin-product.component";
import {AdminCategoryComponent} from "./layout/content/admin-category/admin-category.component";
import {AdminFlavorComponent} from "./layout/content/admin-flavor/admin-flavor.component";
import {AdminComponent} from "./admin.component";
import {AdminHomeComponent} from "./layout/content/admin-home/admin-home.component";
import {TopWidgetsComponent} from "./layout/content/admin-home/top-widgets/top-widgets.component";
import {BottomWidgets} from "./layout/content/admin-home/bottom-widgets/bottom-widgets";
import {RightWidgets} from "./layout/content/admin-home/right-widgets/right-widgets";
import {MidWidgets} from "./layout/content/admin-home/mid-widgets/mid-widgets";
import {AdminCategoryDialogComponent} from "./layout/content/admin-category/admin-category-dialog/admin-category-dialog.component";
import {StatusConvertPipe} from "./pipe/status-convert.pipe";
import {AdminConfirmationDialogComponent} from "./layout/content/reusable/admin-confirmation-dialog/admin-confirmation-dialog.component";
import {AdminFlavorDialogComponent} from "./layout/content/admin-flavor/admin-flavor-dialog/admin-flavor-dialog.component";
import {AdminProductDialogComponent} from "./layout/content/admin-product/admin-product-dialog/admin-product-dialog.component";
import {AdminSaleComponent} from "./layout/content/admin-sale/admin-sale.component";
import {AdminSaleDialogComponent} from "./layout/content/admin-sale/admin-sale-dialog/admin-sale-dialog.component";
import {AdminUserComponent} from "./layout/content/admin-user/admin-user.component";
import {AdminUserDialogComponent} from "./layout/content/admin-user/admin-user-dialog/admin-user-dialog.component";
import {AdminEmployeeComponent} from "./layout/content/admin-employee/admin-employee.component";
import {AdminEmployeeDialogComponent} from "./layout/content/admin-employee/admin-employee-dialog/admin-employee-dialog.component";
import {AdminProductImageComponent} from "./layout/content/admin-product-image/admin-product-image.component";
import {AdminProductImageDialogComponent} from "./layout/content/admin-product-image/admin-product-image-dialog/admin-product-image-dialog.component";
import {AdminProfileComponent} from "./layout/content/admin-profile/admin-profile.component";
import {ObjectToValuePipe} from "./pipe/object-to-value.pipe";
import {AdminLoginComponent} from "./layout/content/admin-login/admin-login.component";
import {AdminHeaderComponent} from "./layout/header/admin-header.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ChartModule} from "angular-highcharts";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {CdkMenuTrigger} from "@angular/cdk/menu";
import {MatTreeModule} from "@angular/material/tree";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {SideNavComponent} from "./layout/side-nav/side-nav.component";
import {RouterModule} from "@angular/router";
import { AdminProductDetailComponent } from './layout/content/admin-product-detail/admin-product-detail.component';
import { AdminProductOriginComponent } from './layout/content/admin-product-origin/admin-product-origin.component';
import { AdminVendorComponent } from './layout/content/admin-vendor/admin-vendor.component';
import { AdminProductOriginDialogComponent } from './layout/content/admin-product-origin/admin-product-origin-dialog/admin-product-origin-dialog.component';
import { AdminVendorDialogComponent } from './layout/content/admin-vendor/admin-vendor-dialog/admin-vendor-dialog.component';
import { AdminProductDetailDialogComponent } from './layout/content/admin-product-detail/admin-product-detail-dialog/admin-product-detail-dialog.component';
import { AdminBrandComponent } from './layout/content/admin-brand/admin-brand.component';
import { AdminBrandDialogComponent } from './layout/content/admin-brand/admin-brand-dialog/admin-brand-dialog.component';
import { AdminOrderComponent } from './layout/content/admin-order/admin-order.component';
import { AdminOrderDialogComponent } from './layout/content/admin-order/admin-order-dialog/admin-order-dialog.component';
import { OrderStatusConvertPipe } from './pipe/order-status-convert.pipe';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgApexchartsModule} from "ng-apexcharts";
import { SubBottomWidgetFirstComponent } from './layout/content/admin-home/bottom-widgets/sub-bottom-widget-first/sub-bottom-widget-first.component';
import { SubBottomWidgetMidFirstComponent } from './layout/content/admin-home/bottom-widgets/sub-bottom-widget-mid-first/sub-bottom-widget-mid-first.component';
import { SubBottomWidgetMidSecondComponent } from './layout/content/admin-home/bottom-widgets/sub-bottom-widget-mid-second/sub-bottom-widget-mid-second.component';
import { SubBottomWidgetEndComponent } from './layout/content/admin-home/bottom-widgets/sub-bototm-widget-end/sub-bottom-widget-end.component';
import { AdminTestComponent } from './layout/content/admin-test/admin-test.component';
import { AdminVoucherComponent } from './layout/content/admin-voucher/admin-voucher.component';
import { AdminVoucherDialogComponent } from './layout/content/admin-voucher/admin-voucher-dialog/admin-voucher-dialog.component';
import {QuillEditorComponent, QuillViewHTMLComponent} from "ngx-quill";
import { AdminTestDialogComponent } from './layout/content/admin-test/admin-test-dialog/admin-test-dialog.component';
import { ConvertUnitPipe } from './pipe/convert-unit.pipe';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    SideNavComponent,
    AdminHomeComponent,
    AdminProductComponent,
    AdminCategoryComponent,
    AdminFlavorComponent,
    TopWidgetsComponent,
    BottomWidgets,
    RightWidgets,
    MidWidgets,
    AdminCategoryDialogComponent,
    StatusConvertPipe,
    AdminConfirmationDialogComponent,
    AdminFlavorDialogComponent,
    AdminProductDialogComponent,
    AdminSaleComponent,
    AdminSaleDialogComponent,
    AdminUserComponent,
    AdminUserDialogComponent,
    AdminEmployeeComponent,
    AdminEmployeeDialogComponent,
    AdminProductImageComponent,
    AdminProductImageDialogComponent,
    AdminProfileComponent,
    ObjectToValuePipe,
    AdminLoginComponent,
    AdminProductDetailComponent,
    AdminProductOriginComponent,
    AdminVendorComponent,
    AdminProductOriginDialogComponent,
    AdminVendorDialogComponent,
    AdminProductDetailDialogComponent,
    AdminBrandComponent,
    AdminBrandDialogComponent,
    AdminOrderComponent,
    AdminOrderDialogComponent,
    OrderStatusConvertPipe,
    RightWidgets,
    SubBottomWidgetFirstComponent,
    SubBottomWidgetMidFirstComponent,
    SubBottomWidgetMidSecondComponent,
    SubBottomWidgetEndComponent,
    AdminTestComponent,
    AdminVoucherComponent,
    AdminVoucherDialogComponent,
    AdminTestDialogComponent,
    ConvertUnitPipe,

  ],
  exports: [
  ],
    imports: [
        CommonModule,
        RouterModule,
        AdminRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgApexchartsModule,
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
        MatCardModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        QuillEditorComponent,
        QuillViewHTMLComponent,
        MatButtonToggleModule,
    ]
})
export class AdminModule { }
