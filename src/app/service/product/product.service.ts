import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../shared/models/product/product";
import {BehaviorSubject, catchError, map, throwError} from "rxjs";
import {ProductDto} from "../../shared/dto/product-dto";
import {Page} from "../../shared/models/page";
import {SuccessMessage} from "../../shared/models/success-message";
import {PageContext} from "../../shared/utils/page-context";
import {environment} from "../../../environments/environment";
import {ProductResponse} from "../../shared/response/product-response";
import {ApiResponse} from "../../shared/api-response";
import {PageResponse} from "../../shared/pageResponse";
import {ProductRequest} from "../../shared/request/product-request";

const ADMIN_API = `${environment.springboot_url}/api/v1/admin/product`;
// const ADMIN_API = `${environment.springboot_url}/test/product`;
const USER_API = `${environment.springboot_url}/api/v1/user/product`;
// const USER_API = `${environment.springboot_url}/test/product`;
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly data = new BehaviorSubject<Page>(null);
  data$ = this.data.asObservable();

  private readonly context = new BehaviorSubject<PageContext>(null);
  context$ = this.context.asObservable();

  setData(data:any){
    this.data.next(data);
  }

  setContext(context:PageContext){
    this.context.next(context);
  }


  constructor(private readonly http:HttpClient) { }

  getAdminProductList(){
    return this.http.get<ApiResponse<ProductResponse[]>>(`${ADMIN_API}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductList(){
    return this.http.get<ApiResponse<ProductResponse[]>>(`${USER_API}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductDtoBySlug(slug:string){
    return this.http.get<ApiResponse<ProductResponse>>(`${USER_API}/slug/${slug}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductListPaging(page:number, sort?:string,
                       flavor?:string, category?:string, brand?:string,
                       origin?:string, vendor?:string){
    return this.http.get<ApiResponse<PageResponse<ProductResponse>>>(`${USER_API}/page/all?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getInstantCoffeeListPaging(page:number, sort?:string,
                             flavor?:string, category?:string, brand?:string,
                             origin?:string, vendor?:string) {
      return this.http.get<ApiResponse<PageResponse<ProductResponse>>>(`${USER_API}/page/instantCoffee?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
          .pipe(
            map(response => response.result),
            catchError(err => {
              console.log("Error handled by Service: " + err)
              console.log("Error handled by Service: " + err.status)
              return throwError(() => new Error(err.error.message));
            })
          )
  }


  getRoastedBeanCoffeeListPaging(page:number, sort?:string,
                               flavor?:string, category?:string, brand?:string,
                               origin?:string, vendor?:string) {
      return this.http.get<ApiResponse<PageResponse<ProductResponse>>>(`${USER_API}/page/roastedBeanCoffee?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
            .pipe(
              map(response => response.result),
                catchError(err => {
                    console.log("Error handled by Service: " + err)
                    console.log("Error handled by Service: " + err.status)
                    return throwError(() => new Error(err.error.message));
                })
            )
  }


  getCoffeeBallListPaging(page:number, sort?:string,
                                   flavor?:string, category?:string, brand?:string,
                                   origin?:string, vendor?:string) {
      return this.http.get<ApiResponse<PageResponse<ProductResponse>>>(`${USER_API}/page/coffeeBall?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
            .pipe(
              map(response => response.result),
                catchError(err => {
                    console.log("Error handled by Service: " + err)
                    console.log("Error handled by Service: " + err.status)
                    return throwError(() => new Error(err.error.message));
                })
            )
  }



  getBottledCoffeeListPaging(page:number, sort?:string,
                         flavor?:string, category?:string, brand?:string,
                         origin?:string, vendor?:string){
        return this.http.get<ApiResponse<PageResponse<ProductResponse>>>(`${USER_API}/page/bottledCoffee?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
            .pipe(
              map(response => response.result),
                catchError(err=>{
                    console.log("Error handled by Service: "+err.status)
                    return throwError(()=> new Error(err.error.message));
                })
            )
  }


  getSpecialCoffeeListPaging(page:number, sort?:string,
                         flavor?:string, category?:string, brand?:string,
                         origin?:string, vendor?:string){
      return this.http.get<ApiResponse<PageResponse<ProductResponse>>>(`${USER_API}/page/special?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
          .pipe(
            map(response => response.result),
                catchError(err=>{
                    console.log("Error handled by Service: "+err.status)
                    return throwError(()=> new Error(err.error.message));
                })
          )
  }

  getLimitedCoffeeListPaging(page:number, sort?:string,
                         flavor?:string, category?:string, brand?:string,
                         origin?:string, vendor?:string){
      return this.http.get<ApiResponse<PageResponse<ProductResponse>>>(`${USER_API}/page/limited?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
          .pipe(
            map(response => response.result),
                catchError(err=>{
                    console.log("Error handled by Service: "+err.status)
                    return throwError(()=> new Error(err.error.message));
                })
          )
  }

  getContinentCoffeeListPaging(name:string,page:number, sort?:string,
                               flavor?:string, category?:string, brand?:string,
                               origin?:string, vendor?:string){
    return this.http.get<ApiResponse<PageResponse<ProductResponse>>>(`${USER_API}/page/continent/${name}?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }


  getBestSellerCoffeeListPaging(page:number, sort?:string,
                               flavor?:string, category?:string, brand?:string,
                               origin?:string, vendor?:string){
    return this.http.get<ApiResponse<PageResponse<ProductResponse>>>(`${USER_API}/page/bestSeller?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }


  getProductResponseById(id:number){
    return this.http.get<ApiResponse<ProductResponse>>(`${USER_API}/${id}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getAdminProductsByCategory(categoryId:number){
    return this.http.get<ApiResponse<ProductResponse[]>>(`${ADMIN_API}/category/${categoryId}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }


  getTop3LatestProducts(){
    return this.http.get<ApiResponse<ProductResponse[]>>(`${USER_API}/top/3LatestProducts`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop3BestSellerProducts(){
    return this.http.get<ApiResponse<ProductResponse[]>>(`${USER_API}/top/3LatestProducts`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop3SpecialProducts(){
    return this.http.get<ApiResponse<ProductResponse[]>>(`${USER_API}/top/3Special`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop10ProductsInColombia(){
    return this.http.get<ApiResponse<ProductResponse[]>>(`${USER_API}/top/10Colombia`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop10ProductsByRoastedCoffeeBeans(){
    return this.http.get<ApiResponse<ProductResponse[]>>(`${USER_API}/top/10RoastedBean`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop10ProductsByBottledCoffee(){
    return this.http.get<ApiResponse<ProductResponse[]>>(`${USER_API}/top/10BottledCoffee`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getTop10RelatedProductsByFlavor(id:number, flavorId:number){
    return this.http.get<ApiResponse<ProductResponse[]>>(`${USER_API}/${id}/related/${flavorId}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  createProduct(product:ProductRequest){
    return this.http.post<ApiResponse<ProductResponse>>(`${ADMIN_API}`,product)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  updateProduct(id:number, product:ProductRequest){
    return this.http.put<ApiResponse<ProductResponse>>(`${ADMIN_API}/${id}`,product)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  deleteProduct(id:number){
    return this.http.delete<ApiResponse<string>>(`${ADMIN_API}/${id}`)
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }
}
