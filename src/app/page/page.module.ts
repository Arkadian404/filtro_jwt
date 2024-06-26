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
import {MatLineModule, MatNativeDateModule} from "@angular/material/core";
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
import { CurrencyVNDPipe } from './pipe/currency-VND.pipe';
import { CheckoutComponent } from './layout/content/checkout/checkout.component';
import {MatStepperModule} from "@angular/material/stepper";
import { InvoiceComponent } from './layout/content/invoice/invoice.component';
import { MomoCallbackComponent } from './layout/content/payment/momo-callback/momo-callback.component';
import { VnpayCallbackComponent } from './layout/content/payment/vnpay-callback/vnpay-callback.component';
import { CodCallbackComponent } from './layout/content/payment/cod-callback/cod-callback.component';
import { OrdersComponent } from './layout/content/orders/orders.component';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import { OrderDetailModalComponent } from './layout/content/orders/order-detail-modal/order-detail-modal.component';
import { UserConfirmationDialogComponent } from './layout/content/reusable/user-confirmation-dialog/user-confirmation-dialog.component';
import { WishlistComponent } from './layout/content/wishlist/wishlist.component';
import {QuillEditorComponent, QuillViewHTMLComponent} from "ngx-quill";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ChatbotComponent } from './layout/content/chat/chatbot/chatbot.component';
import { CollapsibleChatboxComponent } from './layout/content/chat/collapsible-chatbox/collapsible-chatbox.component';
import { InstructionComponent } from './layout/content/instruction/instruction.component';
import { PrivacyComponent } from './layout/content/privacy/privacy.component';
import { MaintenanceComponent } from './layout/content/maintenance/maintenance.component';

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
        CurrencyVNDPipe,
        CheckoutComponent,
        InvoiceComponent,
        MomoCallbackComponent,
        VnpayCallbackComponent,
        CodCallbackComponent,
        OrdersComponent,
        OrderDetailModalComponent,
        UserConfirmationDialogComponent,
        WishlistComponent,
        ChatbotComponent,
        CollapsibleChatboxComponent,
        InstructionComponent,
        PrivacyComponent,
        MaintenanceComponent,
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
    MatStepperModule,
    MatLineModule,
    ButtonModule,
    TableModule,
    QuillEditorComponent,
    QuillViewHTMLComponent,
    MatAutocompleteModule,

  ],
  exports: [
    CurrencyVNDPipe,
    ConvertUnitPipe
  ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule { }
