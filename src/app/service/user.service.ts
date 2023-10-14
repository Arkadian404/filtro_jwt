import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../shared/models/user";
import {catchError, throwError} from "rxjs";
import {SuccessMessage} from "../shared/models/success-message";

const USER_API:string = "http://localhost:8080/api/v1/admin/user"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}

  getUserList(){
    return this.http.get<User[]>(`${USER_API}/getList`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getUserById(id:number){
    return this.http.get<User>(`${USER_API}/find/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  createUser(user:User){
    return this.http.post<SuccessMessage>(`${USER_API}/create`,user)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  updateUser(id:number, user:User){
    return this.http.put<SuccessMessage>(`${USER_API}/update/${id}`,user)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  deleteUser(id:number){
    return this.http.delete<SuccessMessage>(`${USER_API}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  changePassword(id:number, oldPassword:string, newPassword:string){
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
