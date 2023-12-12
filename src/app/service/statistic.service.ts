import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Revenue} from "../shared/models/statistic/revenue";
import {catchError, throwError} from "rxjs";
import {OrderStatistic} from "../shared/models/statistic/order-statistic";

const API = 'http://localhost:8080/api/v1/user/statistic';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private http:HttpClient) { }

  getRevenue(month:number, year:number){
    return this.http.get<Revenue>(`${API}/get/revenue?month=${month}&year=${year}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getOrderStatistic(month:number, year:number){
    return this.http.get<OrderStatistic>(`${API}/get/order?month=${month}&year=${year}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getUserStatistic(month:number, year:number){
    return this.http.get<OrderStatistic>(`${API}/get/user?month=${month}&year=${year}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductStatistic(month:number, year:number){
    return this.http.get<OrderStatistic>(`${API}/get/product?month=${month}&year=${year}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

}
