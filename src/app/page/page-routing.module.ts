import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageComponent} from "./page.component";
import {HomeComponent} from "./layout/content/home/home.component";
import {LoginComponent} from "./layout/content/login/login.component";
import {userLoginGuard} from "../guards/user-login.guard";
import {RegisterComponent} from "./layout/content/register/register.component";
import {LogoutComponent} from "./layout/content/logout/logout.component";
import {ForgotPasswordComponent} from "./layout/content/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./layout/content/reset-password/reset-password.component";
import {RefreshTokenComponent} from "./layout/content/refresh-token/refresh-token.component";
import {SearchComponent} from "./layout/content/search/search.component";

const routes: Routes = [
  {path:'', component:PageComponent ,children:[
      {path:'home', component:HomeComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path:'search', component:SearchComponent},
      {path:'login', component:LoginComponent, canActivate: [userLoginGuard]},
      {path:'register', component:RegisterComponent},
      {path:'logout', component:LogoutComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password', component: ResetPasswordComponent},
      {path: 'refreshToken', component:RefreshTokenComponent},

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
