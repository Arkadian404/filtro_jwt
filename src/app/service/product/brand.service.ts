import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Brand} from "../../shared/models/product/brand";
import {catchError, map, throwError} from "rxjs";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";
import {ApiResponse} from "../../shared/api-response";
import {BrandResponse} from "../../shared/response/brand-response";
import {BrandRequest} from "../../shared/request/brand-request";

const ADMIN_API = `${environment.springboot_url}/api/v1/admin/brand`;
const USER_API = `${environment.springboot_url}/api/v1/user/brand`;

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient) { }

  getAdminBrandList(){
    return this.http.get<ApiResponse<BrandResponse[]>>(`${ADMIN_API}`)
      .pipe(
        map(response => response.result),
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getBrandList(){
    return this.http.get<ApiResponse<BrandResponse[]>>(`${USER_API}`)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }



  createBrand(brand:BrandRequest){
    return this.http.post<ApiResponse<BrandResponse>>(`${ADMIN_API}`, brand)
      .pipe(
        map(response => response.message),
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  updateBrand(id:number, brand:Brand){
    return this.http.put<ApiResponse<BrandResponse>>(`${ADMIN_API}/${id}`, brand)
      .pipe(
        map(response => response.message),
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  deleteBrand(id:number){
    return this.http.delete<ApiResponse<BrandResponse>>(`${ADMIN_API}/${id}`)
      .pipe(
        map(response => response.message),
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }
}
