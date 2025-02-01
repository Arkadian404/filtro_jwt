import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductDetail} from "../../shared/models/product/product-detail";
import {catchError, map, Observable, switchMap, throwError} from "rxjs";
import {Cart} from "../../shared/models/cart";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";
import {ApiResponse} from "../../shared/api-response";
import {ProductDetailResponse} from "../../shared/response/product-detail-response";
import {ProductDetailRequest} from "../../shared/request/product-detail-request";

const API = `${environment.springboot_url}/api/v1/admin/product-detail`;

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(private http:HttpClient) { }

  getAdminProductDetails(){
    return this.http.get<ApiResponse<ProductDetailResponse[]>>(`${API}`)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  create(productDetail:ProductDetailRequest) {
    return this.http.post<ApiResponse<ProductDetailResponse>>(`${API}`, productDetail)
      .pipe(
        map(response => response.message),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  update(id:number, productDetail:ProductDetailRequest) {
    return this.http.put<ApiResponse<ProductDetailResponse>>(`${API}/${id}`, productDetail)
      .pipe(
        map(response => response.message),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  delete(id:number) {
    return this.http.delete<ApiResponse<string>>(`${API}/${id}`)
      .pipe(
        map(response => response.message),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }
}
