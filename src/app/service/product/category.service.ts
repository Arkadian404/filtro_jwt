import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../../shared/models/product/category";
import {catchError, throwError} from "rxjs";
import {CategoryDto} from "../../shared/dto/category-dto";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";

const ADMIN_API:string = `${environment.springboot_url}/api/v1/admin/category`;
const USER_API:string = `${environment.springboot_url}/api/v1/user/category`;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAdminCategoryList(){
    return this.http.get<Category[]>(`${ADMIN_API}/getList`)
      .pipe(
      catchError(err=>{
        console.log("Error handled by Service: "+err.status)
        return throwError(()=> new Error(err.error.message));
      })
    );
  }

  getCategoryList(){
    return this.http.get<CategoryDto[]>(`${USER_API}/getList`)
      .pipe(
      catchError(err=>{
        console.log("Error handled by Service: "+err.status)
        return throwError(()=> new Error(err.error.message));
      })
    );
  }

  getCategoryById(id:number){
    return this.http.get<Category>(`${ADMIN_API}/find/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getUserCategoryById(id:number){
    return this.http.get<Category>(`${USER_API}/find/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  createCategory(category:Category){
    return this.http.post<SuccessMessage>(`${ADMIN_API}/create`, category)
      .pipe(
      catchError((err) => {
        console.log('Error handled by Service...' + err.status);
        return throwError(()=> new Error(err.error.message));
      })
    );
  }

  updateCategory(id:number,category:Category){
    return this.http.put<SuccessMessage>(`${ADMIN_API}/update/${id}`, category)
      .pipe(
        catchError((err) => {
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  deleteCategory(id:number){
    return this.http.delete<SuccessMessage>(`${ADMIN_API}/delete/${id}`)
      .pipe(
        catchError((err) => {
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );;
  }
}
