import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Vendor} from "../shared/models/vendor";
import {catchError, throwError} from "rxjs";

const API = 'http://localhost:8080/api/v1/admin/vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http:HttpClient) { }

  getVendorList(){
    return this.http.get<Vendor[]>(`${API}/getList`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getById(id:number){
    return this.http.get<Vendor>(`${API}/find/${id}`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  create(vendor:Vendor) {
    return this.http.post<Vendor>(`${API}/create`, vendor)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  update(id:number, vendor:Vendor) {
    return this.http.put<Vendor>(`${API}/update/${id}`, vendor)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  delete(id:number) {
    return this.http.delete<Vendor>(`${API}/delete/${id}`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

}
