import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Revenue} from "../shared/models/statistic/revenue";
import {catchError, throwError} from "rxjs";
import {OrderStatistic} from "../shared/models/statistic/order-statistic";
import {OrderLocationStatistic} from "../shared/models/statistic/order-location-statistic";
import {CategoryStatistic} from "../shared/models/statistic/category-statistic";
import {FlavorStatistic} from "../shared/models/statistic/flavor-statistic";
import {BrandStatistic} from "../shared/models/statistic/brand-statistic";
import {OriginStatistic} from "../shared/models/statistic/origin-statistic";
import {environment} from "../../environments/environment";

const API = `${environment.springboot_url}/api/v1/user/statistic`;

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

  getOrderLocationStatisticByCurrentMonth(){
    return this.http.get<OrderLocationStatistic[]>(`${API}/get/order/location/currentMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getOrderLocationStatisticByLastMonth(){
    return this.http.get<OrderLocationStatistic[]>(`${API}/get/order/location/lastMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
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

  getCategoryStatisticByCurrentMonth(){
    return this.http.get<CategoryStatistic[]>(`${API}/get/category/currentMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getCategoryStatisticByLastMonth(){
    return this.http.get<CategoryStatistic[]>(`${API}/get/category/lastMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getFlavorStatisticByCurrentMonth(){
    return this.http.get<FlavorStatistic[]>(`${API}/get/flavor/currentMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getFlavorStatisticByLastMonth(){
    return this.http.get<FlavorStatistic[]>(`${API}/get/flavor/lastMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getBrandStatisticByCurrentMonth(){
    return this.http.get<BrandStatistic[]>(`${API}/get/brand/currentMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getBrandStatisticByLastMonth(){
    return this.http.get<BrandStatistic[]>(`${API}/get/brand/lastMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getOriginStatisticByCurrentMonth(){
    return this.http.get<OriginStatistic[]>(`${API}/get/origin/currentMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getOriginStatisticByLastMonth(){
    return this.http.get<OriginStatistic[]>(`${API}/get/origin/lastMonth`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }
}
