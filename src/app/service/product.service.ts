import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../shared/models/product";
import {catchError, throwError} from "rxjs";

const PRODUCT_API:string = 'http://localhost:8080/api/v1/admin/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProductList(){
    return this.http.get<Product[]>(`${PRODUCT_API}/getList`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductById(id:number){
    return this.http.get<Product>(`${PRODUCT_API}/find/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  createProduct(product:Product){
    return this.http.post<Product>(`${PRODUCT_API}/create`,product)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  updateProduct(id:number, product:Product){
    return this.http.put<Product>(`${PRODUCT_API}/update/${id}`,product)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );;
  }

  deleteProduct(id:number){
    return this.http.delete(`${PRODUCT_API}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );;
  }
}
