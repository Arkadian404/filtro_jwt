import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";
import {ReviewDto} from "../shared/dto/review-dto";
import {ReviewRating} from "../shared/models/statistic/review-rating";

const API_URL = 'http://localhost:8080/api/v1/user/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService{

  constructor(private http:HttpClient) { }


  getAllReviews(){
    return this.http.get<ReviewDto[]>(`${API_URL}/all`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getReviewById(id:number){
    return this.http.get<ReviewDto>(`${API_URL}/find/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getReviewsByProductId(id:number){
    return this.http.get<ReviewDto[]>(`${API_URL}/product/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getReviewProductCount(id:number){
    return this.http.get<number>(`${API_URL}/get/countReviewProduct/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getReviewRating(id:number){
    return this.http.get<ReviewRating[]>(`${API_URL}/get/productReviewRating/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  createReview(content:any, parentId:number, product:any, user:any){
    return this.http.post<ReviewDto>(`${API_URL}/create`,
      {
        user:user,
        product:product,
        rating: content?.rating??null,
        comment: content.comment,
        parentId: parentId
      }
    )
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  updateReview(content:any, id:number){
    return this.http.put(`${API_URL}/update/${id}`, {
      comment: content.comment,
    })
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  deleteReview(id:number){
    return this.http.delete(`${API_URL}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }



}
