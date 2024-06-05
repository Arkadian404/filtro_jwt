import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductDetail} from "../../shared/models/product/product-detail";
import {catchError, map, Observable, switchMap, throwError} from "rxjs";
import {Cart} from "../../shared/models/cart";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";

const API = `${environment.springboot_url}/api/v1/admin/product-detail`;

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(private http:HttpClient) { }

  getAdminProductDetails(){
    return this.http.get<ProductDetail[]>(`${API}/getList`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getById(id:number){
    return this.http.get<ProductDetail>(`${API}/find/${id}`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getByProductId(id:number){
    return this.http.get<ProductDetail[]>(`${API}/getListByProduct/${id}`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  create(productDetail:ProductDetail) {
    return this.http.post<SuccessMessage>(`${API}/create`, productDetail)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  update(id:number, productDetail:ProductDetail) {
    return this.http.put<SuccessMessage>(`${API}/update/${id}`, productDetail)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  delete(id:number) {
    return this.http.delete<SuccessMessage>(`${API}/delete/${id}`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getSampleProductDetailFromLocalStorage(): ProductDetail{
    const sampleProductDetailJson = localStorage.getItem('sampleProductDetail');
    console.log("sampleProductDetailJson: ", sampleProductDetailJson);
    return sampleProductDetailJson ? JSON.parse(sampleProductDetailJson): "";
  }


}
