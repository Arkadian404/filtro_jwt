import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import {PageComponent} from "./page.component";
import {HomeComponent} from "./layout/content/home/home.component";
import {HeaderComponent} from "./layout/header/header.component";
import {FooterComponent} from "./layout/footer/footer.component";
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
import {LoginComponent} from "./layout/content/login/login.component";
import {LogoutComponent} from "./layout/content/logout/logout.component";
import {RegisterComponent} from "./layout/content/register/register.component";
import {RefreshTokenComponent} from "./layout/content/refresh-token/refresh-token.component";
import {ResetPasswordComponent} from "./layout/content/reset-password/reset-password.component";
import {ForgotPasswordComponent} from "./layout/content/forgot-password/forgot-password.component";
import {MatBadgeModule} from "@angular/material/badge";
import { SearchComponent } from './layout/content/search/search.component';
import {RouterModule} from "@angular/router";
import {DropdownHoverDirective} from "./dropdown-hover.directive";
import { register } from 'swiper/element/bundle';
import { CollectionComponent } from './layout/content/collection/collection.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import { AllComponent } from './layout/content/collection/all/all.component';
import { InstantCoffeeComponent } from './layout/content/collection/instant-coffee/instant-coffee.component';
import { RoastedBeanCoffeeComponent } from './layout/content/collection/roasted-bean-coffee/roasted-bean-coffee.component';
import { CoffeeBallComponent } from './layout/content/collection/coffee-ball/coffee-ball.component';
import { BottledCoffeeComponent } from './layout/content/collection/bottled-coffee/bottled-coffee.component';
import { SpecialCoffeeComponent } from './layout/content/collection/special-coffee/special-coffee.component';
import { LimitedCoffeeComponent } from './layout/content/collection/limited-coffee/limited-coffee.component';
import { AmericasCoffeeComponent } from './layout/content/collection/americas-coffee/americas-coffee.component';
import { AfricaCoffeeComponent } from './layout/content/collection/africa-coffee/africa-coffee.component';
import { AsiaCoffeeComponent } from './layout/content/collection/asia-coffee/asia-coffee.component';
import { BestSellerComponent } from './layout/content/collection/best-seller/best-seller.component';
import { ContactComponent } from './layout/content/contact/contact.component';
import { IntroduceComponent } from './layout/content/introduce/introduce.component';
import { UserInfoComponent } from './layout/content/user-info/user-info.component';
import { ProductDetailsComponent } from './layout/content/product-details/product-details.component';
import {AdminModule} from "../admin/admin.module";
import {SpaceToDashPipe} from "./pipe/space-to-dash.pipe";
import { DashToSpacePipe } from './pipe/dash-to-space.pipe';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ReviewsComponent } from './layout/content/product-details/reviews/reviews.component';
import { ReviewComponent } from './layout/content/product-details/reviews/review/review.component';
import { ReviewFormComponent } from './layout/content/product-details/reviews/review-form/review-form.component';
import {RatingModule} from "primeng/rating";

import {CartComponent} from "./layout/content/cart/cart.component";
import { ConvertUnitPipe } from './pipe/convert-unit.pipe';

register();
@NgModule({
    declarations: [
        DropdownHoverDirective,
        PageComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        RefreshTokenComponent,
        ResetPasswordComponent,
        ForgotPasswordComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        SearchComponent,
        CollectionComponent,
        AllComponent,
        InstantCoffeeComponent,
        RoastedBeanCoffeeComponent,
        CoffeeBallComponent,
        BottledCoffeeComponent,
        SpecialCoffeeComponent,
        LimitedCoffeeComponent,
        AmericasCoffeeComponent,
        AfricaCoffeeComponent,
        AsiaCoffeeComponent,
        BestSellerComponent,
        ContactComponent,
        IntroduceComponent,
        UserInfoComponent,
        ProductDetailsComponent,
        SpaceToDashPipe,
        DashToSpacePipe,
        ReviewsComponent,
        ReviewComponent,
        ReviewFormComponent,
        CartComponent,
        ConvertUnitPipe,
    ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PageRoutingModule,
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
    MatCardModule,
    MatTabsModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    AdminModule,
    MatProgressBarModule,
    RatingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule { }
