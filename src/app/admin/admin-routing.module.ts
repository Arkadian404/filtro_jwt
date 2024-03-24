import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AdminHomeComponent} from "./layout/content/admin-home/admin-home.component";
import {authGuard} from "../guards/auth.guard";
import {AdminLoginComponent} from "./layout/content/admin-login/admin-login.component";
import {AdminProfileComponent} from "./layout/content/admin-profile/admin-profile.component";
import {AdminUserComponent} from "./layout/content/admin-user/admin-user.component";
import {AdminEmployeeComponent} from "./layout/content/admin-employee/admin-employee.component";
import {roleGuard} from "../guards/role.guard";
import {AdminCategoryComponent} from "./layout/content/admin-category/admin-category.component";
import {AdminFlavorComponent} from "./layout/content/admin-flavor/admin-flavor.component";
import {AdminProductComponent} from "./layout/content/admin-product/admin-product.component";
import {AdminProductImageComponent} from "./layout/content/admin-product-image/admin-product-image.component";
import {AdminSaleComponent} from "./layout/content/admin-sale/admin-sale.component";
import {adminLoginGuard} from "../guards/admin-login.guard";
import {AdminVendorComponent} from "./layout/content/admin-vendor/admin-vendor.component";
import {AdminProductOriginComponent} from "./layout/content/admin-product-origin/admin-product-origin.component";
import {AdminProductDetailComponent} from "./layout/content/admin-product-detail/admin-product-detail.component";
import {AdminBrandComponent} from "./layout/content/admin-brand/admin-brand.component";
import {AdminOrderComponent} from "./layout/content/admin-order/admin-order.component";
import {AdminVoucherComponent} from "./layout/content/admin-voucher/admin-voucher.component";
import {AdminTestComponent} from "./layout/content/admin-test/admin-test.component";

const routes: Routes = [
  {path: '', component: AdminComponent,  children:[
      {path: 'login', component: AdminLoginComponent, canActivate: [adminLoginGuard]},
      {path: 'home', component: AdminHomeComponent,  canActivate:[authGuard]},
      {path:'', redirectTo:'home', pathMatch:'full'},
      {path: 'profile', component: AdminProfileComponent,  canActivate:[authGuard]},
      {path:'user', component: AdminUserComponent,  canActivate:[authGuard]},
      {path: 'employee', component: AdminEmployeeComponent, canActivate:[authGuard,roleGuard]},
      {path:'category', component: AdminCategoryComponent,  canActivate:[authGuard]},
      {path: 'flavor', component: AdminFlavorComponent,  canActivate:[authGuard]},
      {path:'product', component: AdminProductComponent,  canActivate:[authGuard]},
      {path:'product-image', component: AdminProductImageComponent,  canActivate:[authGuard]},
      {path: 'sale', component: AdminSaleComponent,  canActivate:[authGuard]},
      {path:'vendor', component:AdminVendorComponent, canActivate:[authGuard]},
      {path: 'product-origin', component: AdminProductOriginComponent, canActivate:[authGuard]},
      {path: 'product-detail', component: AdminProductDetailComponent, canActivate:[authGuard]},
      {path: 'brand', component: AdminBrandComponent, canActivate:[authGuard]},
      {path: 'order', component: AdminOrderComponent, canActivate:[authGuard]},
      {path: 'voucher', component: AdminVoucherComponent, canActivate:[authGuard]},
      {path:'test', component: AdminTestComponent, canActivate:[authGuard]}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
