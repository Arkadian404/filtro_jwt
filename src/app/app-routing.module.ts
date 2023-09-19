import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {LogoutComponent} from "./authentication/logout/logout.component";
import {HomeComponent} from "./page/home/home.component";
import {RefreshTokenComponent} from "./authentication/refresh-token/refresh-token.component";
import {authGuard} from "./guards/auth.guard";
import {PageComponent} from "./page/page.component";
import {MainComponent} from "./admin/main/main.component";
import {CategoryComponent} from "./admin/category/category.component";
import {FlavorComponent} from "./admin/flavor/flavor.component";
import {ProductComponent} from "./admin/product/product.component";
import {SaleComponent} from "./admin/sale/sale.component";
import {EmployeeComponent} from "./admin/employee/employee.component";
import {UserComponent} from "./admin/user/user.component";
import {ProductImageComponent} from "./admin/product-image/product-image.component";
import {roleGuard} from "./guards/role.guard";
import {ProfileComponent} from "./admin/profile/profile.component";
import {AdminLoginComponent} from "./admin/admin-login/admin-login.component";
import {loginGuard} from "./guards/login.guard";
import {ResetPasswordComponent} from "./authentication/reset-password/reset-password.component";
import {ForgotPasswordComponent} from "./authentication/forgot-password/forgot-password.component";


const routes:Routes = [
  {path: 'admin', component: AdminComponent, children:[
      {path:'', redirectTo:'home', pathMatch:'full'},
      {path: 'home', component: MainComponent , canActivate:[authGuard]},
      {path: 'login', component: AdminLoginComponent},
      {path: 'profile', component: ProfileComponent},
      {path:'user', component: UserComponent},
      {path: 'employee', component: EmployeeComponent, canActivate:[roleGuard]},
      {path:'category', component: CategoryComponent},
      {path: 'flavor', component: FlavorComponent},
      {path:'product', component: ProductComponent},
      {path:'product-image', component: ProductImageComponent},
      {path: 'sale', component: SaleComponent}
    ]},
  {path:'', component:PageComponent,children:[
      {path:'home', component:HomeComponent},
      {path:'login', component:LoginComponent, canActivate: [loginGuard]},
      {path:'register', component:RegisterComponent},
      {path:'logout', component:LogoutComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password', component: ResetPasswordComponent},
      {path: 'refreshToken', component:RefreshTokenComponent},
    ]}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
