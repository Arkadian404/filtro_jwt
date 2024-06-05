import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";
import {ReviewDto} from "../../shared/dto/review-dto";
import {ReviewRating} from "../../shared/models/statistic/review-rating";
import {SuccessMessage} from "../../shared/models/success-message";
import {environment} from "../../../environments/environment";

const API_URL = `${environment.springboot_url}/api/v1/user/review`;

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

  isUserReviewed(userId:number, productId:number){
    return this.http.get<boolean>(`${API_URL}/check/user/${userId}/review/${productId}`);
  }

  createReview(content:any, parentId:number, product:any, user:any){
    return this.http.post<SuccessMessage>(`${API_URL}/create`,
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
    return this.http.put<SuccessMessage>(`${API_URL}/update/${id}`, {
      rating: content?.rating??null,
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
    return this.http.delete<SuccessMessage>(`${API_URL}/delete/${id}`)
      .pipe(
        catchError(err=>{
          console.log("Error handled by Service: "+err.status)
          return throwError(()=> new Error(err.error.message));
        })
      );
  }

  hasUserBoughtProduct(userId:number, productId:number){
    return this.http.get<boolean>(`${API_URL}/check/user/${userId}/${productId}`);
  }

}
