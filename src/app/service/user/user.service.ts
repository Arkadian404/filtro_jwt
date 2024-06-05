import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../shared/models/user";
import {catchError, throwError} from "rxjs";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";

const ADMIN_API:string = `${environment.springboot_url}/api/v1/admin/user`
const USER_API:string = `${environment.springboot_url}/api/v1/user/user-info`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}

  currentUser(){
    return this.http.get<User>(`${USER_API}/current-user`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getUserList(){
    return this.http.get<User[]>(`${ADMIN_API}/getList`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getUserById(id:number){
    return this.http.get<User>(`${ADMIN_API}/find/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  createUser(user:User){
    return this.http.post<SuccessMessage>(`${ADMIN_API}/create`,user)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  updateUser(id:number, user:User){
    return this.http.put<SuccessMessage>(`${ADMIN_API}/update/${id}`,user)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  updateUserInfo(id:number, user:User){
    return this.http.put<SuccessMessage>(`${USER_API}/update/${id}`,user)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  deleteUser(id:number){
    return this.http.delete<SuccessMessage>(`${ADMIN_API}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  changePassword(id:number, oldPassword:string, newPassword:string){
    return this.http.post(`${ADMIN_API}/change-password/${id}`, {
      oldPassword: oldPassword,
      newPassword: newPassword
    })
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  changeUserPassword(id:number, oldPassword:string, newPassword:string){
    return this.http.post(`${USER_API}/change-password/${id}`, {
      oldPassword: oldPassword,
      newPassword: newPassword
    })
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

}
