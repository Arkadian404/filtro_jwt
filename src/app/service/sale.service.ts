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
    return this.http.get<Sale[]>(`${EVENT_API}/getList`);
  }

  getSaleById(id:number){
    return this.http.get<Sale>(`${EVENT_API}/find/${id}`);
  }

  createSale(sale:Sale){
    return this.http.post<Sale>(`${EVENT_API}/create`,sale, {responseType: 'text' as 'json'})
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error))
        })
      )
  }

  updateSale(id:number, sale:Sale){
    return this.http.put<Sale>(`${EVENT_API}/update/${id}`,sale, {responseType: 'text' as 'json'})
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error))
        })
      )
  }

  deleteSale(id:number){
    return this.http.delete<Sale>(`${EVENT_API}/delete/${id}`, {responseType: 'text' as 'json'})
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error))
        })
      )
  }

}
