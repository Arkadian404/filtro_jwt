import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, switchMap, tap, throwError} from "rxjs";
import {AuthenticationRequest} from "../shared/models/auth/authentication-request.interface";
import {Register} from "../shared/models/auth/register.interface";
import {User} from "../shared/models/user";
import {TokenService} from "./token.service";
import {AuthenticationResponse} from "../shared/models/auth/authentication-response.interface";


const AUTH_API:string = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http:HttpClient,
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
    return this.http.get(`${AUTH_API}/auth/logout`);
  }

  public currentUserAccess():Observable<User>{
    return this.http.get<User>(`${AUTH_API}/auth/current-user`)
      .pipe(
        catchError((err) => {
          console.log("Error handled by Service..." + err.status)
          return throwError(()=> new Error("fix later!"));
        })
      );
  }
  public adminAccess(){
    return this.http.get<User>(`${AUTH_API}/admin`)

  }

  public managementAccess(){
    return this.http.get(`${AUTH_API}/management`, {responseType: "text" as "json"})
  }

  public refreshToken():Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(`${AUTH_API}/auth/refresh-token`, {
      "refreshToken":this.tokenService.getRefreshToken()
    }).pipe(tap(token=>{
      this.tokenService.setAccessToken(token.accessToken);
      this.tokenService.setRefreshToken(token.refreshToken);
    })
      ,catchError((err)=>{
      console.log("Error handled by Service..." + err.status)
      return throwError(()=> new Error(err.error.message));
    })
    );
  }

}
