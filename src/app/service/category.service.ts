import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../shared/models/category";
import {catchError, throwError} from "rxjs";

const CATEGORY_API:string = 'http://localhost:8080/api/v1/admin/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getCategoryList(){
    return this.http.get<Category[]>(`${CATEGORY_API}/getList`)
      .pipe(
      catchError(err=>{
        console.log("Error handled by Service: "+err.status)
        return throwError(()=> new Error(err.error.message));
      })
    );
  }

  getCategoryById(id:number){
    return this.http.get<Category>(`${CATEGORY_API}/find/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  createCategory(category:Category){
    return this.http.post<Category>(`${CATEGORY_API}/create`, category)
      .pipe(
      catchError((err) => {
        console.log('Error handled by Service...' + err.status);
        return throwError(()=> new Error(err.error.message));
      })
    );
  }

  updateCategory(id:number,category:Category){
    return this.http.put<Category>(`${CATEGORY_API}/update/${id}`, category)
      .pipe(
        catchError((err) => {
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  deleteCategory(id:number){
    return this.http.delete<Category>(`${CATEGORY_API}/delete/${id}`)
      .pipe(
        catchError((err) => {
          console.log('Error handled by Service...' + err.status);
          return throwError(()=> new Error(err.error.message));
        })
      );;
  }
}
