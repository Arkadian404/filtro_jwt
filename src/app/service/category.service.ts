import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../shared/models/product/category";
import {catchError, throwError} from "rxjs";
import {CategoryDto} from "../shared/dto/category-dto";

const ADMIN_API:string = 'http://localhost:8080/api/v1/admin/category';
const USER_API:string = 'http://localhost:8080/api/v1/user/category';

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
    return this.http.post<Category>(`${ADMIN_API}/create`, category)
      .pipe(
      catchError((err) => {
        console.log('Error handled by Service...' + err.status);
        return throwError(()=> new Error(err.error.message));
      })
    );
  }

  updateCategory(id:number,category:Category){
    return this.http.put<Category>(`${ADMIN_API}/update/${id}`, category)
      .pipe(
        catchError((err) => {
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  deleteCategory(id:number){
    return this.http.delete<Category>(`${ADMIN_API}/delete/${id}`)
      .pipe(
        catchError((err) => {
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );;
  }
}
