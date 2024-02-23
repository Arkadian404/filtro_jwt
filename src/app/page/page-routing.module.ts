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
import {CollectionComponent} from "./layout/content/collection/collection.component";
import {AllComponent} from "./layout/content/collection/all/all.component";
import {InstantCoffeeComponent} from "./layout/content/collection/instant-coffee/instant-coffee.component";
import {
    RoastedBeanCoffeeComponent
} from "./layout/content/collection/roasted-bean-coffee/roasted-bean-coffee.component";
import {CoffeeBallComponent} from "./layout/content/collection/coffee-ball/coffee-ball.component";
import {BottledCoffeeComponent} from "./layout/content/collection/bottled-coffee/bottled-coffee.component";
import {SpecialCoffeeComponent} from "./layout/content/collection/special-coffee/special-coffee.component";
import {AmericasCoffeeComponent} from "./layout/content/collection/americas-coffee/americas-coffee.component";
import {AfricaCoffeeComponent} from "./layout/content/collection/africa-coffee/africa-coffee.component";
import {AsiaCoffeeComponent} from "./layout/content/collection/asia-coffee/asia-coffee.component";
import {BestSellerComponent} from "./layout/content/collection/best-seller/best-seller.component";
import {LimitedCoffeeComponent} from "./layout/content/collection/limited-coffee/limited-coffee.component";
import {UserInfoComponent} from "./layout/content/user-info/user-info.component";
import {userInfoGuard} from "../guards/user-info.guard";
import {ContactComponent} from "./layout/content/contact/contact.component";
import {IntroduceComponent} from "./layout/content/introduce/introduce.component";
import {ProductDetailsComponent} from "./layout/content/product-details/product-details.component";
import {CartComponent} from "./layout/content/cart/cart.component";
import {CheckoutComponent} from "./layout/content/checkout/checkout.component";
import {CodCallbackComponent} from "./layout/content/payment/cod-callback/cod-callback.component";
import {MomoCallbackComponent} from "./layout/content/payment/momo-callback/momo-callback.component";
import {VnpayCallbackComponent} from "./layout/content/payment/vnpay-callback/vnpay-callback.component";
import {OrdersComponent} from "./layout/content/orders/orders.component";
import {WishlistComponent} from "./layout/content/wishlist/wishlist.component";


const routes: Routes = [
  {path:'', component:PageComponent ,children:[
      {path:'home', component:HomeComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'user-info', component:UserInfoComponent, canActivate:[userInfoGuard]},
      {path:'search', component:SearchComponent},
      {path:'login', component:LoginComponent, canActivate: [userLoginGuard]},
      {path:'register', component:RegisterComponent},
      {path:'logout', component:LogoutComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password', component: ResetPasswordComponent},
      {path: 'refreshToken', component:RefreshTokenComponent},
      {path: 'collection', component:CollectionComponent,  children:[
        {path:'all', component:AllComponent},
        {path: '', redirectTo: 'all', pathMatch: 'full'},
        {path: 'instant-coffee', component: InstantCoffeeComponent},
        {path: 'roasted-bean-coffee', component: RoastedBeanCoffeeComponent},
        {path: 'coffee-ball', component: CoffeeBallComponent},
        {path: 'bottled-coffee', component: BottledCoffeeComponent},
        {path: 'special-coffee', component: SpecialCoffeeComponent},
        {path: 'limited-coffee', component: LimitedCoffeeComponent},
        {path: 'americas-coffee', component: AmericasCoffeeComponent},
        {path: 'africa-coffee', component: AfricaCoffeeComponent},
        {path: 'asia-coffee', component: AsiaCoffeeComponent},
        {path: 'best-seller', component: BestSellerComponent}]
      },
      {path:'product/:slug', component: ProductDetailsComponent },
      {path: 'cart', component:CartComponent},
      {path:'checkout', component:CheckoutComponent},
      {path: 'payment', children:[
          {path:'cod', component: CodCallbackComponent},
          {path: 'momo', component: MomoCallbackComponent},
          {path:'vnpay', component: VnpayCallbackComponent}
        ]},
      {path: 'wishlist', component:WishlistComponent},
      {path:'orders', component:OrdersComponent},
      {path:'contact', component:ContactComponent},
      {path:'introduce', component: IntroduceComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
