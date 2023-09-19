import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {ActivatedRoute} from "@angular/router";

const API = 'http://localhost:8080/api/v1/auth/forgot-password';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient,
              private activatedRoute:ActivatedRoute) { }

  public sendEmail(email:string){
    return this.http.post(`${API}/send-mail?email=${email}`, null)
      .pipe(
        catchError(err=> {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  public processResetPassword(newPassword:string){
    const token = this.activatedRoute.snapshot.queryParams.token;
    const email = this.activatedRoute.snapshot.queryParams.email;
    return this.http.post(`${API}/reset-password?token=${token}&email=${email}`, newPassword)
      .pipe(
        catchError(err=> {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }
}
