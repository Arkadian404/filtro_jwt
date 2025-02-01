import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductOrigin} from "../../shared/models/product/product-origin";
import {catchError, map, throwError} from "rxjs";
import {ProductOriginDto} from "../../shared/dto/product-origin-dto";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";
import {ApiResponse} from "../../shared/api-response";
import {ProductOriginResponse} from "../../shared/response/product-origin-response";
import {ProductOriginRequest} from "../../shared/request/product-origin.-request";

const ADMIN_API = `${environment.springboot_url}/api/v1/admin/product-origin`;
const USER_API = `${environment.springboot_url}/api/v1/user/product-origin`;

@Injectable({
  providedIn: 'root'
})
export class ProductOriginService {

  constructor(private http:HttpClient) { }

  getAdminProductOriginList(){
    return this.http.get<ApiResponse<ProductOriginResponse[]>>(`${ADMIN_API}`)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getProductOriginList(){
    return this.http.get<ApiResponse<ProductOriginResponse[]>>(`${USER_API}`)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getProductOriginContinentList(name:string){
      return this.http.get<ApiResponse<ProductOriginResponse[]>>(`${USER_API}/continent/${name}`)
          .pipe(
            map(response => response.result),
            catchError(err => {
              console.log("Error handled by Service: ", err.status);
              return throwError(()=> new Error(err.error.message));
            })
          )
  }


  create(productOrigin:ProductOriginRequest) {
    return this.http.post<ApiResponse<ProductOriginResponse>>(`${ADMIN_API}`, productOrigin)
      .pipe(
        map(response => response.message),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  update(id:number, productOrigin:ProductOriginRequest) {
    return this.http.put<ApiResponse<ProductOriginResponse[]>>(`${ADMIN_API}/${id}`, productOrigin)
      .pipe(
        map(response => response.message),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  delete(id:number) {
    return this.http.delete<ApiResponse<string>>(`${ADMIN_API}/${id}`)
      .pipe(
        map(response => response.message),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

}
