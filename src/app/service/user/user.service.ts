import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../shared/models/user";
import {catchError, map, throwError} from "rxjs";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";
import {ApiResponse} from "../../shared/api-response";
import {UserResponse} from "../../shared/response/user-response";
import {UserRequest} from "../../shared/request/user-request";

const ADMIN_API:string = `${environment.springboot_url}/api/v1/admin/user`
const USER_API:string = `${environment.springboot_url}/api/v1/user/user-info`
// const USER_API:string = `${environment.springboot_url}/test/user-info`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}

  currentUser(){
    return this.http.get<ApiResponse<UserResponse>>(`${USER_API}/current-user`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getUserList(){
    return this.http.get<ApiResponse<UserResponse[]>>(`${ADMIN_API}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  createUser(user:UserRequest){
    return this.http.post<ApiResponse<UserResponse>>(`${ADMIN_API}`,user)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  updateUser(id:number, user:UserRequest){
    return this.http.put<ApiResponse<UserResponse>>(`${ADMIN_API}/${id}`,user)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  updateUserInfo(id:number, user:UserRequest){
    return this.http.post<ApiResponse<UserResponse>>(`${USER_API}/update`,user)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  deleteUser(id:number){
    return this.http.delete<ApiResponse<string>>(`${ADMIN_API}/${id}`)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  changePassword(id:number, oldPassword:string, newPassword:string){
    return this.http.post<ApiResponse<string>>(`${ADMIN_API}/change-password/${id}`, {
      oldPassword: oldPassword,
      newPassword: newPassword
    })
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  changeUserPassword(id:number, oldPassword:string, newPassword:string){
    return this.http.post<ApiResponse<string>>(`${USER_API}/change-password/${id}`, {
      oldPassword: oldPassword,
      newPassword: newPassword
    })
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

}
