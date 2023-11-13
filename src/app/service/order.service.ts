import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderDto} from "../shared/dto/order-dto";
import {catchError, throwError} from "rxjs";
import {MomoResponse} from "../shared/models/momo-response";


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

}
