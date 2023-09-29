import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductOrigin} from "../shared/models/product/product-origin";
import {catchError, throwError} from "rxjs";

const API = 'http://localhost:8080/api/v1/admin/product-origin';

@Injectable({
  providedIn: 'root'
})
export class ProductOriginService {

  constructor(private http:HttpClient) { }

  getProductOriginList(){
    return this.http.get<ProductOrigin[]>(`${API}/getList`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getById(id:number){
    return this.http.get<ProductOrigin>(`${API}/find/${id}`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  create(productOrigin:ProductOrigin) {
    return this.http.post<ProductOrigin>(`${API}/create`, productOrigin)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  update(id:number, productOrigin:ProductOrigin) {
    return this.http.put<ProductOrigin>(`${API}/update/${id}`, productOrigin)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  delete(id:number) {
    return this.http.delete<ProductOrigin>(`${API}/delete/${id}`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

}
