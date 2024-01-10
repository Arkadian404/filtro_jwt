import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Voucher} from "../shared/models/voucher";
import {catchError, throwError} from "rxjs";
import {SuccessMessage} from "../shared/models/success-message";

const VOUCHER_API = 'http://localhost:8080/api/v1/admin/voucher';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http:HttpClient) { }

  getAllVoucher(){
    return this.http.get<Voucher[]>(`${VOUCHER_API}/getList`);
  }

  getVoucherById(id:number) {
    return this.http.get<Voucher>(`${VOUCHER_API}/get/${id}`)
      .pipe(
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  createVoucher(voucher:Voucher){
    return this.http.post<SuccessMessage>(`${VOUCHER_API}/create`, voucher)
      .pipe(
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  updateVoucher(id:number, voucher:Voucher){
    return this.http.put<SuccessMessage>(`${VOUCHER_API}/update/${id}`, voucher)
      .pipe(
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

  deleteVoucher(id:number){
    return this.http.delete<SuccessMessage>(`${VOUCHER_API}/delete/${id}`)
      .pipe(
        catchError(err => {
          console.log('Error handled by Service...' + err.status);
          return throwError(() => new Error(err.error.message))
        })
      );
  }

}
