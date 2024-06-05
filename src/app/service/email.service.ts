import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {SuccessMessage} from "../shared/models/success-message";
import {FeedbackMail} from "../shared/models/feedback-mail";
import {environment} from "../../environments/environment";

const RESET_API = `${environment.springboot_url}/api/v1/auth/forgot-password`;
const API = `${environment.springboot_url}/api/v1/mail`;

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient,
              private activatedRoute:ActivatedRoute) { }

  public sendEmail(email:string){
    return this.http.post<SuccessMessage>(`${RESET_API}/send-mail?email=${email}`, null)
      .pipe(
        catchError(err=> {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  public processResetPassword(newPassword:string){
    const token = this.activatedRoute.snapshot.queryParams.token;
    return this.http.post(`${RESET_API}/reset-password?token=${token}`, newPassword)
      .pipe(
        catchError(err=> {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  public sendOrderMail(email:string, template:string){
    return this.http.post<SuccessMessage>(`${API}/send-order-mail?email=${email}`, template)
      .pipe(
        catchError(err=> {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  public sendFeedbackMail(feedback: FeedbackMail){
    return this.http.post<SuccessMessage>(`${API}/send-feedback-mail`, feedback)
      .pipe(
        catchError(err=> {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }
}
