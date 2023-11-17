import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderDto} from "../shared/dto/order-dto";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {MomoResponse} from "../shared/models/momo-response";
import {VnpResponse} from "../shared/models/vnp-response";
import {ShippingMethodDto} from "../shared/dto/shipping-method-dto";


const Order_API = 'http://localhost:8080/api/v1/user/order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient) { }


  getAllOrderByUserId(userId:number){
    return this.http.get<OrderDto[]>(`${Order_API}/get/${userId}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.message))
        })
      );
  }

  placeOrder(order:OrderDto){
    return this.http.post<OrderDto>(`${Order_API}/placeOrder`, order)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.message))
        })
      );
  }

  placeMomoOrder(order:OrderDto){
    return this.http.post<MomoResponse>(`${Order_API}/placeMomoOrder`, order)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.message))
        })
      );
  }

  placeVNPayOrder(order:OrderDto){
    return this.http.post<VnpResponse>(`${Order_API}/placeVNPayOrder`, order)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.message))
        })
      );
  }

  getShippingMethods(){
    return this.http.get<ShippingMethodDto[]>(`${Order_API}/get/shippingMethods`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.message))
        })
      );
  }
}
