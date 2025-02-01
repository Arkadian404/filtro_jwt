import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderDto} from "../shared/dto/order-dto";
import {BehaviorSubject, catchError, map, Observable, throwError} from "rxjs";
import {MomoResponse} from "../shared/models/momo-response";
import {VnpResponse} from "../shared/models/vnp-response";
import {ShippingMethodDto} from "../shared/dto/shipping-method-dto";
import {OrderDetail} from "../shared/models/order-detail";
import {OrderDetailDto} from "../shared/dto/order-detail-dto";
import {Order} from "../shared/models/order";
import {SuccessMessage} from "../shared/models/success-message";
import {environment} from "../../environments/environment";
import {ApiResponse} from "../shared/api-response";
import {OrderResponse} from "../shared/response/order-response";
import {OrderDetailResponse} from "../shared/response/order-detail-response";
import {OrderRequest} from "../shared/request/order-request";


const Order_API = `${environment.springboot_url}/api/v1/user/order`;
// const Order_API = `${environment.springboot_url}/test/order`;
const Order_API_ADMIN = `${environment.springboot_url}/api/v1/admin/order`;
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient) { }


  getAdminOrderList(){
    return this.http.get<ApiResponse<OrderResponse[]>>(`${Order_API_ADMIN}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  updateAdminOrder(id?:number, order?:OrderRequest){
    return this.http.put<ApiResponse<OrderResponse[]>>(`${Order_API_ADMIN}/${id}`, order)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  deleteAdminOrder(id:number){
    return this.http.delete<ApiResponse<string>>(`${Order_API_ADMIN}/${id}`)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );

  }

  getAllOrderByUserId(userId:number){
    return this.http.get<ApiResponse<OrderResponse[]>>(`${Order_API}/user/${userId}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  getAdminOrderDetailByOrderId(orderId:number){
    return this.http.get<ApiResponse<OrderDetailResponse[]>>(`${Order_API_ADMIN}/${orderId}/details`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  getOrderDetailByOrderId(orderId:number){
    return this.http.get<ApiResponse<OrderDetailResponse[]>>(`${Order_API}/${orderId}/items`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  placeOrder(order:OrderRequest){
    return this.http.post<ApiResponse<OrderResponse>>(`${Order_API}/place/order`, order)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  placeMomoOrder(order:OrderRequest){
    return this.http.post<MomoResponse>(`${Order_API}/place/MomoOrder`, order)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  placeVNPayOrder(order:OrderRequest){
    return this.http.post<VnpResponse>(`${Order_API}/place/VNPayOrder`, order)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  cancelOrder(id:number){
    return this.http.post<ApiResponse<string>>(`${Order_API}/cancel/${id}`, {})
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }
}
