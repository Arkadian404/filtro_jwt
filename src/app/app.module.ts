import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {AuthInterceptor} from "./auth.interceptor";
import {MAT_DIALOG_DATA, MAT_DIALOG_SCROLL_STRATEGY, MatDialogRef} from "@angular/material/dialog";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MY_DATE_FORMAT} from "./shared/utils/config"
import {MomentUtcDateAdapter} from "./shared/utils/date-format";
import {environment} from "../environments/environment"
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getStorage, provideStorage} from "@angular/fire/storage";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

import * as firebase from '@firebase/app';

import {AdminModule} from "./admin/admin.module";
import {PageModule} from "./page/page.module";
import {RouterModule} from "@angular/router";
import {QuillModule} from "ngx-quill";
import {ScrollStrategyOptions} from "@angular/cdk/overlay";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";



firebase.initializeApp(environment.firebaseConfig) //firebase
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    HttpClientModule,
    AppRoutingModule,
    AdminModule,
    PageModule,
    QuillModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic' } },
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandlerService
    // },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'en-GB'
    },
    // {
    //   provide: DateAdapter,
    //   useClass: MomentDateAdapter,
    //   deps: [MAT_DATE_LOCALE]
    // },
    {
      provide: DateAdapter,
      useClass: MomentUtcDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_DATE_FORMAT
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
