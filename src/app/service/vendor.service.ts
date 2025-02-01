import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Vendor} from "../shared/models/product/vendor";
import {catchError, map, throwError} from "rxjs";
import {VendorDto} from "../shared/dto/vendor-dto";
import {SuccessMessage} from "../shared/models/success-message";
import {environment} from "../../environments/environment";
import {ApiResponse} from "../shared/api-response";
import {VendorResponse} from "../shared/response/vendor-response";
import {VendorRequest} from "../shared/request/vendor-request";

const ADMIN_API = `${environment.springboot_url}/api/v1/admin/vendor`;
const USER_API = `${environment.springboot_url}/api/v1/user/vendor`;

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http:HttpClient) { }

  getAdminVendorList(){
    return this.http.get<ApiResponse<VendorResponse[]>>(`${ADMIN_API}`)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getVendorList(){
    return this.http.get<ApiResponse<VendorResponse[]>>(`${USER_API}`)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }


  create(vendor:VendorRequest) {
    return this.http.post<ApiResponse<VendorResponse>>(`${ADMIN_API}`, vendor)
      .pipe(
        map(response => response.message),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  update(id:number, vendor:VendorRequest) {
    return this.http.put<ApiResponse<VendorResponse>>(`${ADMIN_API}/${id}`, vendor)
      .pipe(
        map(response => response.message),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  delete(id:number) {
    return this.http.delete<ApiResponse<string>>(`${ADMIN_API}/${id}`)
      .pipe(
        map(response => response.message),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

}
