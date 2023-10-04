import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Brand} from "../shared/models/product/brand";
import {catchError, throwError} from "rxjs";

const API = 'http://localhost:8080/api/v1/admin/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient) { }

  getBrandList(){
    return this.http.get<Brand[]>(`${API}/getList`)
      .pipe(
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getBrandById(id:number){
    return this.http.get<Brand>(`${API}/find/${id}`)
      .pipe(
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  createBrand(brand:Brand){
    return this.http.post<Brand>(`${API}/create`, brand)
      .pipe(
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  updateBrand(id:number, brand:Brand){
    return this.http.put<Brand>(`${API}/update/${id}`, brand)
      .pipe(
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  deleteBrand(id:number){
    return this.http.delete<Brand>(`${API}/delete/${id}`)
      .pipe(
        catchError(err =>{
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }
}
