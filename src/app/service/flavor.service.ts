import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Flavor} from "../shared/models/product/flavor";
import {catchError, throwError} from "rxjs";

const ADMIN_API:string ="http://localhost:8080/api/v1/admin/flavor"
const USER_API:string ="http://localhost:8080/api/v1/user/flavor"

@Injectable({
  providedIn: 'root'
})
export class FlavorService {

  constructor(private http:HttpClient) { }

  getAdminFlavorList(){
    return this.http.get<Flavor[]>(`${ADMIN_API}/getList`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getFlavorList(){
    return this.http.get<Flavor[]>(`${USER_API}/getList`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getAdminFlavorById(id:number){
    return this.http.get<Flavor>(`${ADMIN_API}/${id}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      );
  }

  getFlavorById(id:number){
    return this.http.get<Flavor>(`${USER_API}/${id}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      );
  }

  createFlavor(flavor:Flavor){
    return this.http.post<Flavor>(`${ADMIN_API}/create`, flavor)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      )
  }

  updateFlavor(id:number, flavor:Flavor){
    return this.http.put<Flavor>(`${ADMIN_API}/update/${id}`, flavor)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      )
  }

  deleteFlavor(id:number){
    return this.http.delete<Flavor>(`${ADMIN_API}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      )
  }


}
