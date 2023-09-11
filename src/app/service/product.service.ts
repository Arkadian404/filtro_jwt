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
    return this.http.get<Product[]>(`${PRODUCT_API}/getList`);
  }

  getProductById(id:number){
    return this.http.get<Product>(`${PRODUCT_API}/find/${id}`);
  }

  createProduct(product:Product){
    return this.http.post<Product>(`${PRODUCT_API}/create`,product, {responseType: 'text' as 'json'})
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error))
        })
      );
  }

  updateProduct(id:number, product:Product){
    return this.http.put<Product>(`${PRODUCT_API}/update/${id}`,product, {responseType: 'text' as 'json'})
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error))
        })
      );;
  }

  deleteProduct(id:number){
    return this.http.delete(`${PRODUCT_API}/delete/${id}`, {responseType: 'text' as 'json'})
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error))
        })
      );;
  }
}
