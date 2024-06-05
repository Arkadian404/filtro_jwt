import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, switchMap, throwError} from "rxjs";
import {ProductImage} from "../../shared/models/product/product-image";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";

const PRODUCT_IMAGE_API:string = `${environment.springboot_url}/api/v1/admin/product-image`;

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  constructor(private http:HttpClient) { }

  getAdminProductImageList(){
    return this.http.get<ProductImage[]>(`${PRODUCT_IMAGE_API}/getList`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductImageListByProductId(id:number){
    return this.http.get<ProductImage[]>(`${PRODUCT_IMAGE_API}/getListByProductId/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductImageById(id:number){
    return this.http.get(`${PRODUCT_IMAGE_API}/find/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  createProductImage(productImage:ProductImage){
    return this.http.post<SuccessMessage>(`${PRODUCT_IMAGE_API}/create`,productImage)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  updateProductImage(id:number, productImage:ProductImage){
    return this.http.put<SuccessMessage>(`${PRODUCT_IMAGE_API}/update/${id}`,productImage)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );;
  }

  deleteProductImage(id:number){
    return this.http.delete<SuccessMessage>(`${PRODUCT_IMAGE_API}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

}
