import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Voucher} from "../shared/models/voucher";
import {catchError, throwError} from "rxjs";
import {SuccessMessage} from "../shared/models/success-message";
import {environment} from "../../environments/environment";

const VOUCHER_API_ADMIN = `${environment.springboot_url}/api/v1/admin/voucher`;
const VOUCHER_API = `${environment.springboot_url}/api/v1/user/voucher`;

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http:HttpClient) { }

  getAllVoucher(){
    return this.http.get<Voucher[]>(`${VOUCHER_API_ADMIN}/getList`);
  }

  getVoucherById(id:number) {
    return this.http.get<Voucher>(`${VOUCHER_API_ADMIN}/get/${id}`)
      .pipe(
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }


  getAvailableVoucherByProductId(productId:number){
    return this.http.get<Voucher[]>(`${VOUCHER_API}/availableVouchers/${productId}`)
      .pipe(
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }


  getAvailableVoucherToAllProducts(){
    return this.http.get<Voucher[]>(`${VOUCHER_API}/availableVouchers/all`)
      .pipe(
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  createVoucher(voucher:Voucher){
    return this.http.post<SuccessMessage>(`${VOUCHER_API_ADMIN}/create`, voucher)
      .pipe(
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  updateVoucher(id:number, voucher:Voucher){
    return this.http.put<SuccessMessage>(`${VOUCHER_API_ADMIN}/update/${id}`, voucher)
      .pipe(
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  checkVoucherExpirationDate(voucherId:number){
    return this.http.get<boolean> (`${VOUCHER_API}/check/${voucherId}`)
      .pipe(
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  deleteVoucher(id:number){
    return this.http.delete<SuccessMessage>(`${VOUCHER_API_ADMIN}/delete/${id}`)
      .pipe(
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  applyVoucher(code:string){
    return this.http.post<SuccessMessage>(`${VOUCHER_API}/apply`, code)
      .pipe(
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  removeVoucher(id:number){
    return this.http.delete<SuccessMessage>(`${VOUCHER_API}/remove/${id}`)
      .pipe(
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

}
