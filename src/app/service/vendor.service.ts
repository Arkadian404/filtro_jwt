import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Vendor} from "../shared/models/product/vendor";
import {catchError, throwError} from "rxjs";
import {VendorDto} from "../shared/dto/vendor-dto";
import {SuccessMessage} from "../shared/models/success-message";
import {environment} from "../../environments/environment";

const ADMIN_API = `${environment.springboot_url}/api/v1/admin/vendor`;
const USER_API = `${environment.springboot_url}/api/v1/user/vendor`;

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http:HttpClient) { }

  getAdminVendorList(){
    return this.http.get<Vendor[]>(`${ADMIN_API}/getList`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getVendorList(){
    return this.http.get<VendorDto[]>(`${USER_API}/getList`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getById(id:number){
    return this.http.get<Vendor>(`${ADMIN_API}/find/${id}`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  create(vendor:Vendor) {
    return this.http.post<SuccessMessage>(`${ADMIN_API}/create`, vendor)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  update(id:number, vendor:Vendor) {
    return this.http.put<SuccessMessage>(`${ADMIN_API}/update/${id}`, vendor)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  delete(id:number) {
    return this.http.delete<SuccessMessage>(`${ADMIN_API}/delete/${id}`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

}
