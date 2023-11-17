import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {authGuard} from "./guards/auth.guard";

const routes:Routes = [
  {path: '', children:[
      {path:'', loadChildren: () => import('./page/page-routing.module').then(p=> p.PageRoutingModule) },
      {path:'admin', loadChildren: () => import('./admin/admin-routing.module').then(a=> a.AdminRoutingModule)},
    ]},
  {path:'**', redirectTo:'', pathMatch:'full'},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'disabled'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
