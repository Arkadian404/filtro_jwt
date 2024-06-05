import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Brand} from "../../shared/models/product/brand";
import {catchError, throwError} from "rxjs";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";

const ADMIN_API = `${environment.springboot_url}/api/v1/admin/brand`;
const USER_API = `${environment.springboot_url}/api/v1/user/brand`;

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient) { }

  getAdminBrandList(){
    return this.http.get<Brand[]>(`${ADMIN_API}/getList`)
      .pipe(
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getBrandList(){
    return this.http.get<Brand[]>(`${USER_API}/getList`)
      .pipe(
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getAdminBrandById(id:number){
    return this.http.get<Brand>(`${ADMIN_API}/find/${id}`)
      .pipe(
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getBrandById(id:number){
    return this.http.get<Brand>(`${USER_API}/find/${id}`)
      .pipe(
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  createBrand(brand:Brand){
    return this.http.post<SuccessMessage>(`${ADMIN_API}/create`, brand)
      .pipe(
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  updateBrand(id:number, brand:Brand){
    return this.http.put<SuccessMessage>(`${ADMIN_API}/update/${id}`, brand)
      .pipe(
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  deleteBrand(id:number){
    return this.http.delete<SuccessMessage>(`${ADMIN_API}/delete/${id}`)
      .pipe(
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }
}
