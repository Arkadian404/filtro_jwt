import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../../shared/models/product/category";
import {catchError, map, throwError} from "rxjs";
import {CategoryDto} from "../../shared/dto/category-dto";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";
import {ApiResponse} from "../../shared/api-response";
import {CategoryResponse} from "../../shared/response/category-response";
import {CategoryRequest} from "../../shared/request/category-request";

const ADMIN_API:string = `${environment.springboot_url}/api/v1/admin/category`;
const USER_API:string = `${environment.springboot_url}/api/v1/user/category`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAdminCategoryList(){
    return this.http.get<ApiResponse<CategoryResponse[]>>(`${ADMIN_API}`)
      .pipe(
        map(response => response.result),
      catchError(err=>{
        console.log("Error handled by Service: "+err.status)
        return throwError(()=> new Error(err.error.message));
      })
    );
  }

  getCategoryList(){
    return this.http.get<ApiResponse<CategoryResponse[]>>(`${USER_API}`)
      .pipe(
        map(response => response.result),
        catchError(err => {
          console.log("Error handled by Service: ", err.status);
          return throwError(()=> new Error(err.error.message));
        })
    );
  }


  createCategory(category:CategoryRequest){
    return this.http.post<ApiResponse<CategoryResponse>>(`${ADMIN_API}`, category)
      .pipe(
        map(response => response.message),
      catchError((err) => {
        console.log('Error handled by Service...' + err.status);
        return throwError(()=> new Error(err.error.message));
      })
    );
  }

  updateCategory(id:number,category:CategoryRequest){
    return this.http.put<ApiResponse<CategoryResponse>>(`${ADMIN_API}/${id}`, category)
      .pipe(
        map(response => response.message),
        catchError((err) => {
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  deleteCategory(id:number){
    return this.http.delete<ApiResponse<string>>(`${ADMIN_API}/${id}`)
      .pipe(
        map(response => response.message),
        catchError((err) => {
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );;
  }
}
