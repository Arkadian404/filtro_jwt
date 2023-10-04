import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../shared/models/product/product";
import {catchError, map, throwError} from "rxjs";
import {ProductDto} from "../shared/dto/product-dto";

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

  getProductsByCategory(categoryId:number){
    return this.http.get<Product[]>(`${PRODUCT_API}/getListByCategory/${categoryId}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductsByVendor(vendorId:number){
    return this.http.get<Product[]>(`${PRODUCT_API}/getListByVendor/${vendorId}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductsByOrigin(originId:number){
    return this.http.get<Product[]>(`${PRODUCT_API}/getListByOrigin/${originId}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductsByIsSpecial(){
    return this.http.get<Product[]>(`${PRODUCT_API}/getListByIsSpecial`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getProductsByFlavor(flavorId:number){
    return this.http.get<Product[]>(`${PRODUCT_API}/getListByFlavor/${flavorId}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getProductsBySale(saleId:number){
    return this.http.get<Product[]>(`${PRODUCT_API}/getListBySale/${saleId}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop3LatestProducts(){
    return this.http.get<ProductDto[]>(`${PRODUCT_API}/getTop3LatestProducts`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop3BestSellerProducts(){
    return this.http.get<ProductDto[]>(`${PRODUCT_API}/getTop3BestSellerProducts`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop3SpecialProducts(){
    return this.http.get<ProductDto[]>(`${PRODUCT_API}/getTop3SpecialProducts`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop10ProductsInColombia(){
    return this.http.get<ProductDto[]>(`${PRODUCT_API}/getTop10ProductsInColombia`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop10ProductsByRoastedCoffeeBeans(){
    return this.http.get<ProductDto[]>(`${PRODUCT_API}/getTop10ProductsByRoastedCoffeeBeans`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop10ProductsByBottledCoffee(){
    return this.http.get<ProductDto[]>(`${PRODUCT_API}/getTop10ProductsByBottledCoffee`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
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
