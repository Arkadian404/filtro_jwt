import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, switchMap, throwError} from "rxjs";
import {ProductImage} from "../../shared/models/product/product-image";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";
import {ApiResponse} from "../../shared/api-response";
import {ProductImageResponse} from "../../shared/response/product-image-response";
import {ProductImageRequest} from "../../shared/request/product-image-request";

const PRODUCT_IMAGE_API:string = `${environment.springboot_url}/api/v1/admin/product-image`;

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  constructor(private http:HttpClient) { }

  getAdminProductImageList(){
    return this.http.get<ApiResponse<ProductImageResponse[]>>(`${PRODUCT_IMAGE_API}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  createProductImage(productImage:ProductImageRequest){
    return this.http.post<ApiResponse<ProductImageResponse>>(`${PRODUCT_IMAGE_API}`,productImage)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  updateProductImage(id:number, productImage:ProductImageRequest){
    return this.http.put<ApiResponse<ProductImageResponse>>(`${PRODUCT_IMAGE_API}/${id}`,productImage)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );;
  }

  deleteProductImage(id:number){
    return this.http.delete<ApiResponse<string>>(`${PRODUCT_IMAGE_API}/${id}`)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

}
