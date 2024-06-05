import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, switchMap, tap, throwError} from "rxjs";
import {AuthenticationRequest} from "../../shared/models/auth/authentication-request.interface";
import {Register} from "../../shared/models/auth/register.interface";
import {User} from "../../shared/models/user";
import {TokenService} from "../token.service";
import {AuthenticationResponse} from "../../shared/models/auth/authentication-response.interface";
import {Employee} from "../../shared/models/employee";
import {Cart} from "../../shared/models/cart";
import {CartItemService} from "../cart-item.service";
import {environment} from "../../../environments/environment";


const AUTH_API:string = `${environment.springboot_url}/api/v1`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient,
              private cartItemService:CartItemService,
              private tokenService:TokenService) { }


  public authenticate(request:AuthenticationRequest){
    return this.http.post<AuthenticationResponse>(`${AUTH_API}/auth/authenticate`, request)
      .pipe(
        catchError((err)=>{
          console.log("Error handled by Service..." + err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  public authenticateEmployee(request:AuthenticationRequest){
    return this.http.post<AuthenticationResponse>(`${AUTH_API}/auth/authenticate-employee`, request)
      .pipe(
        catchError((err)=>{
          console.log("Error handled by Service..." + err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  public register(request:Register){
    return this.http.post<Register>(`${AUTH_API}/auth/register`, request)
      .pipe(
        catchError((err:HttpErrorResponse) => {
          console.log("Error handled by Service..." + err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  public logout(){
    return this.http.get(`${AUTH_API}/auth/logout`) .pipe(
      catchError((err) => {
        console.log("Error handled by Service..." + err.status)
        return throwError(()=> new Error(err.error.message));
      })
    );
  }

  public currentUserAccess():Observable<User>{
    return this.http.get<User>(`${AUTH_API}/auth/current-user`)
      .pipe(
        catchError((err) => {
          console.log("Error handled by Service..." + err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  public currentEmployeeAccess():Observable<Employee>{
    return this.http.get<Employee>(`${AUTH_API}/auth/current-employee`)
      .pipe(
        catchError((err) => {
          console.log("Error handled by Service..." + err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  public adminAccess(){
    return this.http.get<User>(`${AUTH_API}/admin`)

  }

  public refreshToken():Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${AUTH_API}/auth/refresh-token`, {
      "refreshToken":this.tokenService.getRefreshToken()
    }).pipe(
      tap(token=>{
        this.tokenService.setAccessToken(token.accessToken);
        this.tokenService.setRefreshToken(token.refreshToken);
    }),
      catchError((err)=>{
        console.log("Error handled by Service..." + err.status)
        return throwError(()=> new Error(err.error.message));
    })
    );
  }

  // public getUserNameFromLocalStorage(): string{
  //   const usernameJson = localStorage.getItem('username');
  //   console.log("usernameJson: ", usernameJson);
  //   return usernameJson ? JSON.parse(usernameJson): "";
  // }

}
