import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";
import {ReviewDto} from "../../shared/dto/review-dto";
import {ReviewRating} from "../../shared/models/statistic/review-rating";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";
import {ApiResponse} from "../../shared/api-response";
import {ReviewResponse} from "../../shared/response/review-response";

const API_URL = `${environment.springboot_url}/api/v1/user/review`;
// const API_URL = `${environment.springboot_url}/test/review`;

@Injectable({
  providedIn: 'root'
})
export class ReviewService{

  constructor(private readonly http:HttpClient) { }


  getAllReviews(){
    return this.http.get<ReviewDto[]>(`${API_URL}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getReviewById(id:number){
    return this.http.get<ReviewDto>(`${API_URL}/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getReviewsByProductId(id:number){
    return this.http.get<ApiResponse<ReviewResponse[]>>(`${API_URL}/product/${id}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getReviewProductCount(id:number){
    return this.http.get<ApiResponse<number>>(`${API_URL}/count/product/${id}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  getReviewRating(id:number){
    return this.http.get<ApiResponse<ReviewRating[]>>(`${API_URL}/product/${id}/rating`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  isUserReviewed(userId:number, productId:number){
    return this.http.get<ApiResponse<boolean>>(`${API_URL}/check/user/${userId}/review/${productId}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  createReview(content:any, parentId:number, productId:any, userId:any){
    return this.http.post<ApiResponse<string>>(`${API_URL}`,
      {
        userId: userId,
        productId: productId,
        rating: content?.rating??null,
        comment: content.comment,
        parentId: parentId
      }
    )
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  updateReview(content:any, id:number){
    return this.http.put<ApiResponse<string>>(`${API_URL}/${id}`, {
      rating: content?.rating??null,
      comment: content.comment,
    })
      .pipe(
        map(response => response.message),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  deleteReview(id:number){
    return this.http.delete<ApiResponse<string>>(`${API_URL}/${id}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  hasUserBoughtProduct(userId:number, productId:number){
    return this.http.get<ApiResponse<boolean>>(`${API_URL}/check/user/${userId}/bought/${productId}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

}
