import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Voucher} from "../shared/models/voucher";
import {catchError, map, throwError} from "rxjs";
import {SuccessMessage} from "../shared/models/success-message";
import {environment} from "../../environments/environment";
import {ApiResponse} from "../shared/api-response";
import {VoucherResponse} from "../shared/response/voucher-response";
import {VoucherRequest} from "../shared/request/voucher-request";

const VOUCHER_API_ADMIN = `${environment.springboot_url}/api/v1/admin/voucher`;
const VOUCHER_API = `${environment.springboot_url}/api/v1/user/voucher`;
// const VOUCHER_API = `${environment.springboot_url}/test/voucher`;

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http:HttpClient) { }

  getAllVoucher(){
    return this.http.get<ApiResponse<VoucherResponse[]>>(`${VOUCHER_API_ADMIN}`)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }


  getAvailableVoucherByProductId(productId:number){
    return this.http.get<ApiResponse<VoucherResponse[]>>(`${VOUCHER_API}/available/${productId}`)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }


  getAvailableVoucherToAllProducts(){
    return this.http.get<ApiResponse<VoucherResponse[]>>(`${VOUCHER_API}/available/all`)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  createVoucher(voucher:VoucherRequest){
    return this.http.post<ApiResponse<VoucherResponse>>(`${VOUCHER_API_ADMIN}`, voucher)
      .pipe(
        map(response => response.message),
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  updateVoucher(id:number, voucher:VoucherRequest){
    return this.http.put<ApiResponse<VoucherResponse>>(`${VOUCHER_API_ADMIN}/${id}`, voucher)
      .pipe(
        map(response => response.message),
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  checkVoucherExpirationDate(voucherId:number){
    return this.http.get<ApiResponse<boolean>> (`${VOUCHER_API}/check/${voucherId}`)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  deleteVoucher(id:number){
    return this.http.delete<ApiResponse<string>>(`${VOUCHER_API_ADMIN}/${id}`)
      .pipe(
        map(response => response.message),
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  applyVoucher(code:string){
    return this.http.post<ApiResponse<string>>(`${VOUCHER_API}/apply`, code)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  removeVoucher(id:number){
    return this.http.delete<ApiResponse<string>>(`${VOUCHER_API}/remove/${id}`)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

}
