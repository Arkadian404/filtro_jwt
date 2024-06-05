import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../shared/models/product/product";
import {BehaviorSubject, catchError, throwError} from "rxjs";
import {ProductDto} from "../../shared/dto/product-dto";
import {Page} from "../../shared/models/page";
import {SuccessMessage} from "../../shared/models/success-message";
import {PageContext} from "../../shared/utils/page-context";
import {environment} from "../../../environments/environment";

const ADMIN_API:string = `${environment.springboot_url}/api/v1/admin/product`;
const USER_API:string = `${environment.springboot_url}/api/v1/user/product`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private data = new BehaviorSubject<Page>(null);
  data$ = this.data.asObservable();

  private context = new BehaviorSubject<PageContext>(null);
  context$ = this.context.asObservable();

  setData(data:any){
    this.data.next(data);
  }

  setContext(context:PageContext){
    this.context.next(context);
  }


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

  getProductDtoList(){
    return this.http.get<ProductDto[]>(`${USER_API}/get/all`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductDtoBySlug(slug:string){
    return this.http.get<ProductDto>(`${USER_API}/get/${slug}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getProductListPaging(page:number, sort?:string,
                       flavor?:string, category?:string, brand?:string,
                       origin?:string, vendor?:string){
    return this.http.get<Page>(`${USER_API}/all?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  getInstantCoffeeListPaging(page:number, sort?:string,
                             flavor?:string, category?:string, brand?:string,
                             origin?:string, vendor?:string) {
      return this.http.get<Page>(`${USER_API}/byInstantCoffee?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
          .pipe(
              catchError(err => {
                  console.log("Error handled by Service: " + err.status)
                  return throwError(() => new Error(err.error.message));
              })
          )
  }


  getRoastedBeanCoffeeListPaging(page:number, sort?:string,
                               flavor?:string, category?:string, brand?:string,
                               origin?:string, vendor?:string) {
      return this.http.get<Page>(`${USER_API}/byRoastedBeanCoffee?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
            .pipe(
                catchError(err => {
                    console.log("Error handled by Service: " + err.status)
                    return throwError(() => new Error(err.error.message));
                })
            )
  }


  getCoffeeBallListPaging(page:number, sort?:string,
                                   flavor?:string, category?:string, brand?:string,
                                   origin?:string, vendor?:string) {
      return this.http.get<Page>(`${USER_API}/byCoffeeBall?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
            .pipe(
                catchError(err => {
                    console.log("Error handled by Service: " + err.status)
                    return throwError(() => new Error(err.error.message));
                })
            )
  }



  getBottledCoffeeListPaging(page:number, sort?:string,
                         flavor?:string, category?:string, brand?:string,
                         origin?:string, vendor?:string){
        return this.http.get<Page>(`${USER_API}/byBottledCoffee?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
            .pipe(
                catchError(err=>{
                    console.log("Error handled by Service: "+err.status)
                    return throwError(()=> new Error(err.error.message));
                })
            )
  }


  getSpecialCoffeeListPaging(page:number, sort?:string,
                         flavor?:string, category?:string, brand?:string,
                         origin?:string, vendor?:string){
      return this.http.get<Page>(`${USER_API}/byIsSpecial?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
          .pipe(
                catchError(err=>{
                    console.log("Error handled by Service: "+err.status)
                    return throwError(()=> new Error(err.error.message));
                })
          )
  }

  getLimitedCoffeeListPaging(page:number, sort?:string,
                         flavor?:string, category?:string, brand?:string,
                         origin?:string, vendor?:string){
      return this.http.get<Page>(`${USER_API}/byIsLimited?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
          .pipe(
                catchError(err=>{
                    console.log("Error handled by Service: "+err.status)
                    return throwError(()=> new Error(err.error.message));
                })
          )
  }

  getContinentCoffeeListPaging(name:string,page:number, sort?:string,
                               flavor?:string, category?:string, brand?:string,
                               origin?:string, vendor?:string){
    return this.http.get<Page>(`${USER_API}/byContinent/${name}?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }


  getBestSellerCoffeeListPaging(page:number, sort?:string,
                               flavor?:string, category?:string, brand?:string,
                               origin?:string, vendor?:string){
    return this.http.get<Page>(`${USER_API}/bestSeller?page=${page}&sort=${sort}&flavor=${flavor}&category=${category}&brand=${brand}&origin=${origin}&vendor=${vendor}`)
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

  getProductDtoById(id:number){
    return this.http.get<ProductDto>(`${USER_API}/find/dto/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
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

  getTop10RelatedProductsByFlavor(id:number, flavorId:number){
    return this.http.get<ProductDto[]>(`${USER_API}/${id}/related/${flavorId}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status);
          return throwError(()=> new Error(err.error.message));
        })
      )
  }

  createProduct(product:Product){
    return this.http.post<SuccessMessage>(`${ADMIN_API}/create`,product)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  updateProduct(id:number, product:Product){
    return this.http.put<SuccessMessage>(`${ADMIN_API}/update/${id}`,product)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  deleteProduct(id:number){
    return this.http.delete<SuccessMessage>(`${ADMIN_API}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }
}
