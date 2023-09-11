import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin/admin.component";
import {ManagementComponent} from "./management/management.component";
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


const routes:Routes = [
  {path: 'admin', component: AdminComponent, canActivate:[authGuard], children:[
      {path:'', redirectTo:'home', pathMatch:'full'},
      {path: 'home', component: MainComponent},
      {path:'user', component: UserComponent},
      {path: 'employee', component: EmployeeComponent},
      {path:'category', component: CategoryComponent},
      {path: 'flavor', component: FlavorComponent},
      {path:'product', component: ProductComponent},
      {path: 'sale', component: SaleComponent}
    ]},
  {path:'', component:PageComponent,children:[
      {path:'home', component:HomeComponent},
      {path:'login', component:LoginComponent},
      {path:'register', component:RegisterComponent},
      {path:'logout', component:LogoutComponent},
      {path: 'management', component: ManagementComponent},
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
