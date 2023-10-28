import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {authGuard} from "./guards/auth.guard";
// import {AdminComponent} from "./admin/admin.component";
// import {LoginComponent} from "./authentication/login/login.component";
// import {RegisterComponent} from "./authentication/register/register.component";
// import {LogoutComponent} from "./authentication/logout/logout.component";
// import {HomeComponent} from "./page/layout/content/home/home.component";
// import {RefreshTokenComponent} from "./authentication/refresh-token/refresh-token.component";
// import {authGuard} from "./guards/auth.guard";
// import {PageComponent} from "./page/page.component";
// import {AdminHomeComponent} from "./admin/layout/content/admin-home/admin-home.component";
// import {AdminCategoryComponent} from "./admin/layout/content/admin-category/admin-category.component";
// import {AdminFlavorComponent} from "./admin/layout/content/admin-flavor/admin-flavor.component";
// import {AdminProductComponent} from "./admin/layout/content/admin-product/admin-product.component";
// import {AdminSaleComponent} from "./admin/layout/content/admin-sale/admin-sale.component";
// import {AdminEmployeeComponent} from "./admin/layout/content/admin-employee/admin-employee.component";
// import {AdminUserComponent} from "./admin/layout/content/admin-user/admin-user.component";
// import {AdminProductImageComponent} from "./admin/layout/content/admin-product-image/admin-product-image.component";
// import {roleGuard} from "./guards/role.guard";
// import {AdminProfileComponent} from "./admin/layout/content/admin-profile/admin-profile.component";
// import {AdminLoginComponent} from "./admin/layout/content/admin-login/admin-login.component";
// import {loginGuard} from "./guards/login.guard";
// import {ResetPasswordComponent} from "./authentication/reset-password/reset-password.component";
// import {ForgotPasswordComponent} from "./authentication/forgot-password/forgot-password.component";


const routes:Routes = [
  {path: '', children:[
      {path:'', loadChildren: () => import('./page/page-routing.module').then(p=> p.PageRoutingModule) },
      {path:'admin', loadChildren: () => import('./admin/admin-routing.module').then(a=> a.AdminRoutingModule)},
    ]},
  {path:'**', redirectTo:'', pathMatch:'full'},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
