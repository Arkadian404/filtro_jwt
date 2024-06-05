import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderDto} from "../shared/dto/order-dto";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {MomoResponse} from "../shared/models/momo-response";
import {VnpResponse} from "../shared/models/vnp-response";
import {ShippingMethodDto} from "../shared/dto/shipping-method-dto";
import {OrderDetail} from "../shared/models/order-detail";
import {OrderDetailDto} from "../shared/dto/order-detail-dto";
import {Order} from "../shared/models/order";
import {SuccessMessage} from "../shared/models/success-message";
import {environment} from "../../environments/environment";


const Order_API = `${environment.springboot_url}/api/v1/user/order`;
const Order_API_ADMIN = `${environment.springboot_url}/api/v1/admin/order`;
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient) { }


  getAdminOrderList(){
    return this.http.get<Order[]>(`${Order_API_ADMIN}/get/all`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  updateAdminOrder(id?:number, order?:Order){
    return this.http.put<SuccessMessage>(`${Order_API_ADMIN}/update/${id}`, order)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  deleteAdminOrder(id:number){
    return this.http.delete<SuccessMessage>(`${Order_API_ADMIN}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );

  }

  getAllOrderByUserId(userId:number){
    return this.http.get<OrderDto[]>(`${Order_API}/get/${userId}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  getAdminOrderDetailByOrderId(orderId:number){
    return this.http.get<OrderDetail[]>(`${Order_API_ADMIN}/get/orderDetail/${orderId}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  getOrderDetailByOrderId(orderId:number){
    return this.http.get<OrderDetailDto[]>(`${Order_API}/get/orderDetail/${orderId}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  placeOrder(order:OrderDto){
    return this.http.post<OrderDto>(`${Order_API}/placeOrder`, order)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  placeMomoOrder(order:OrderDto){
    return this.http.post<MomoResponse>(`${Order_API}/placeMomoOrder`, order)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  placeVNPayOrder(order:OrderDto){
    return this.http.post<VnpResponse>(`${Order_API}/placeVNPayOrder`, order)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  getShippingMethods(){
    return this.http.get<ShippingMethodDto[]>(`${Order_API}/get/shippingMethods`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  cancelOrder(id:number){
    return this.http.post<SuccessMessage>(`${Order_API}/cancelOrder/${id}`, {})
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }
}
