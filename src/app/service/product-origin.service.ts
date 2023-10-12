import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductOrigin} from "../shared/models/product/product-origin";
import {catchError, throwError} from "rxjs";

const ADMIN_API = 'http://localhost:8080/api/v1/admin/product-origin';
const USER_API = 'http://localhost:8080/api/v1/user/product-origin';

@Injectable({
  providedIn: 'root'
})
export class ProductOriginService {

  constructor(private http:HttpClient) { }

  getAdminProductOriginList(){
    return this.http.get<ProductOrigin[]>(`${ADMIN_API}/getList`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getProductOriginList(){
    return this.http.get<ProductOrigin[]>(`${USER_API}/getList`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getProductOriginContinentList(name:string){
      return this.http.get<ProductOrigin[]>(`${USER_API}/getListByContinent/${name}`)
          .pipe(
              catchError(err => {
                  console.log("Error handled by Service: ", err.status);
                  return throwError(()=> new Error(err.error.message));
              })
          )
  }

  getById(id:number){
    return this.http.get<ProductOrigin>(`${ADMIN_API}/find/${id}`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  create(productOrigin:ProductOrigin) {
    return this.http.post<ProductOrigin>(`${ADMIN_API}/create`, productOrigin)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  update(id:number, productOrigin:ProductOrigin) {
    return this.http.put<ProductOrigin>(`${ADMIN_API}/update/${id}`, productOrigin)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  delete(id:number) {
    return this.http.delete<ProductOrigin>(`${ADMIN_API}/delete/${id}`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

}
