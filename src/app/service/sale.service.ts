import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Sale} from "../shared/models/sale";
import {catchError, throwError} from "rxjs";

const EVENT_API:string = 'http://localhost:8080/api/v1/admin/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http:HttpClient) { }

  getSaleList(){
    return this.http.get<Sale[]>(`${EVENT_API}/getList`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getSaleById(id:number){
    return this.http.get<Sale>(`${EVENT_API}/find/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );;
  }

  createSale(sale:Sale){
    return this.http.post<Sale>(`${EVENT_API}/create`,sale)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  updateSale(id:number, sale:Sale){
    return this.http.put<Sale>(`${EVENT_API}/update/${id}`,sale)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  deleteSale(id:number){
    return this.http.delete<Sale>(`${EVENT_API}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

}
