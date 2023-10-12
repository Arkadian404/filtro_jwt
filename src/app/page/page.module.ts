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
import { AmericasCofeeComponent } from './layout/content/collection/americas-cofee/americas-cofee.component';
import { AfricaCofeeComponent } from './layout/content/collection/africa-cofee/africa-cofee.component';
import { AsiaCofeeComponent } from './layout/content/collection/asia-cofee/asia-cofee.component';
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
    AmericasCofeeComponent,
    AfricaCofeeComponent,
    AsiaCofeeComponent,
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
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule { }
