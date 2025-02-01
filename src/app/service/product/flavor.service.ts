import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Flavor} from "../../shared/models/product/flavor";
import {catchError, map, throwError} from "rxjs";
import {FlavorDto} from "../../shared/dto/flavor-dto";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";
import {ApiResponse} from "../../shared/api-response";
import {FlavorResponse} from "../../shared/response/flavor-response";
import {FlavorRequest} from "../../shared/request/flavor-request";

const ADMIN_API:string =`${environment.springboot_url}/api/v1/admin/flavor`
const USER_API:string =`${environment.springboot_url}/api/v1/user/flavor`

@Injectable({
  providedIn: 'root'
})
export class FlavorService {

  constructor(private http:HttpClient) { }

  getAdminFlavorList(){
    return this.http.get<ApiResponse<FlavorResponse[]>>(`${ADMIN_API}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getFlavorList(){
    return this.http.get<ApiResponse<FlavorResponse[]>>(`${USER_API}`)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }


  createFlavor(flavor:FlavorRequest){
    return this.http.post<ApiResponse<FlavorResponse>>(`${ADMIN_API}`, flavor)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      )
  }

  updateFlavor(id:number, flavor:FlavorRequest){
    return this.http.put<ApiResponse<FlavorResponse>>(`${ADMIN_API}/${id}`, flavor)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      )
  }

  deleteFlavor(id:number){
    return this.http.delete<ApiResponse<string>>(`${ADMIN_API}/${id}`)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message))
        })
      )
  }


}
