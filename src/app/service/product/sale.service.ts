import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sale} from "../../shared/models/product/sale";
import {catchError, throwError} from "rxjs";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";

const ADMIN_API:string = `${environment.springboot_url}/api/v1/admin/sale`;
const USER_API:string = `${environment.springboot_url}/api/v1/user/sale`;

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http:HttpClient) { }

  getAdminSaleList(){
    return this.http.get<Sale[]>(`${ADMIN_API}/getList`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getSaleList(){
    return this.http.get<Sale[]>(`${USER_API}/getList`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getSaleById(id:number){
    return this.http.get<Sale>(`${ADMIN_API}/find/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );;
  }

  createSale(sale:Sale){
    return this.http.post<SuccessMessage>(`${ADMIN_API}/create`,sale)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  updateSale(id:number, sale:Sale){
    return this.http.put<SuccessMessage>(`${ADMIN_API}/update/${id}`,sale)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  deleteSale(id:number){
    return this.http.delete<SuccessMessage>(`${ADMIN_API}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

}
