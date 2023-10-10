import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../shared/models/product/product";
import {catchError, throwError} from "rxjs";
import {ProductDto} from "../shared/dto/product-dto";
import {Page} from "../shared/models/page";

const ADMIN_API:string = 'http://localhost:8080/api/v1/admin/product';
const USER_API:string = 'http://localhost:8080/api/v1/user/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAdminProductList(){
    return this.http.get<Product[]>(`${ADMIN_API}/getList`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductList(){
    return this.http.get<ProductDto[]>(`${USER_API}/getList`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductListPaging(page:number, sort?:string){
    return this.http.get<Page>(`${USER_API}/list?page=${page}&sort=${sort}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }


  getProductById(id:number){
    return this.http.get<Product>(`${ADMIN_API}/find/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getAdminProductsByCategory(categoryId:number){
    return this.http.get<Product[]>(`${ADMIN_API}/getListByCategory/${categoryId}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductsByCategory(categoryId:number){
    return this.http.get<ProductDto[]>(`${USER_API}/getListByCategory/${categoryId}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message))
        })
      );
  }

  getProductsByBrand(brandId:number){
    return this.http.get<ProductDto[]>(`${USER_API}/getListByBrand/${brandId}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }


  getProductsByVendor(vendorId:number){
    return this.http.get<ProductDto[]>(`${USER_API}/getListByVendor/${vendorId}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductsByOrigin(originId:number){
    return this.http.get<ProductDto[]>(`${USER_API}/getListByOrigin/${originId}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductsByIsSpecial(){
    return this.http.get<ProductDto[]>(`${USER_API}/getListByIsSpecial`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getProductsByFlavor(flavorId:number){
    return this.http.get<ProductDto[]>(`${USER_API}/getListByFlavor/${flavorId}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getProductsBySale(saleId:number){
    return this.http.get<ProductDto[]>(`${USER_API}/getListBySale/${saleId}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop3LatestProducts(){
    return this.http.get<ProductDto[]>(`${USER_API}/getTop3LatestProducts`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop3BestSellerProducts(){
    return this.http.get<ProductDto[]>(`${USER_API}/getTop3BestSellerProducts`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop3SpecialProducts(){
    return this.http.get<ProductDto[]>(`${USER_API}/getTop3SpecialProducts`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop10ProductsInColombia(){
    return this.http.get<ProductDto[]>(`${USER_API}/getTop10ProductsInColombia`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop10ProductsByRoastedCoffeeBeans(){
    return this.http.get<ProductDto[]>(`${USER_API}/getTop10ProductsByRoastedCoffeeBeans`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop10ProductsByBottledCoffee(){
    return this.http.get<ProductDto[]>(`${USER_API}/getTop10ProductsByBottledCoffee`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }


  createProduct(product:Product){
    return this.http.post<Product>(`${ADMIN_API}/create`,product)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  updateProduct(id:number, product:Product){
    return this.http.put<Product>(`${ADMIN_API}/update/${id}`,product)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );;
  }

  deleteProduct(id:number){
    return this.http.delete(`${ADMIN_API}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );;
  }
}
