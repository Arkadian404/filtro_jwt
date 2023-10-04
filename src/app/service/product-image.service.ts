import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, switchMap, throwError} from "rxjs";
import {ProductImage} from "../shared/models/product/product-image";

const PRODUCT_IMAGE_API:string = 'http://localhost:8080/api/v1/admin/product-image';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  constructor(private http:HttpClient) { }

  getProductImageList(){
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

  getProductImageListByProductIdLimit(id:number){
    return this.http.get<ProductImage[]>(`${PRODUCT_IMAGE_API}/getListByProductId/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        }),
        map(data => data[0].url)
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
    return this.http.post<ProductImage>(`${PRODUCT_IMAGE_API}/create`,productImage)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  updateProductImage(id:number, productImage:ProductImage){
    return this.http.put(`${PRODUCT_IMAGE_API}/update/${id}`,productImage)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );;
  }

  deleteProductImage(id:number){
    return this.http.delete(`${PRODUCT_IMAGE_API}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

}
