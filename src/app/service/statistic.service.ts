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

  getRevenueByCurrentMonth(){
    return this.http.get<Revenue[]>(`${API}/get/revenue/currentMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getRevenueByLastMonth(){
    return this.http.get<Revenue[]>(`${API}/get/revenue/lastMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getRevenueByDate(day:number, month:number, year:number){
    return this.http.get<Revenue>(`${API}/get/revenue/date?day=${day}&month=${month}&year=${year}`)
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

  getOrderStatisticByDate(day:number, month:number, year:number){
    return this.http.get<OrderStatistic>(`${API}/get/order/date?day=${day}&month=${month}&year=${year}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getOrderStatisticByCurrentMonth(){
    return this.http.get<OrderStatistic>(`${API}/get/order/currentMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getOrderStatisticByLastMonth(){
    return this.http.get<OrderStatistic>(`${API}/get/order/lastMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getFailedOrderStatisticByCurrentMonth(){
    return this.http.get<OrderStatistic>(`${API}/get/order/failed/currentMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getFailedOrderStatisticByLastMonth(){
    return this.http.get<OrderStatistic>(`${API}/get/order/failed/lastMonth`)
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
