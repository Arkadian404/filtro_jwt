import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Flavor} from "../../shared/models/product/flavor";
import {catchError, throwError} from "rxjs";
import {FlavorDto} from "../../shared/dto/flavor-dto";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";

const ADMIN_API:string =`${environment.springboot_url}/api/v1/admin/flavor`
const USER_API:string =`${environment.springboot_url}/api/v1/user/flavor`

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
    return this.http.get<FlavorDto[]>(`${USER_API}/getList`)
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
    return this.http.post<SuccessMessage>(`${ADMIN_API}/create`, flavor)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      )
  }

  updateFlavor(id:number, flavor:Flavor){
    return this.http.put<SuccessMessage>(`${ADMIN_API}/update/${id}`, flavor)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      )
  }

  deleteFlavor(id:number){
    return this.http.delete<SuccessMessage>(`${ADMIN_API}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      )
  }


}
