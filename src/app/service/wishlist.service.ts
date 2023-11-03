import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WishlistDto} from "../shared/dto/wishlist-dto";
import {catchError, throwError} from "rxjs";
import {WishlistItemDto} from "../shared/dto/wishlist-item-dto";
import {SuccessMessage} from "../shared/models/success-message";
import {CartItemDto} from "../shared/dto/cart-item-dto";


const WISHLIST_API = 'http://localhost:8080/api/v1/user/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) { }

  getWishlist(username:string){
    return this.http.get<WishlistDto>(`${WISHLIST_API}/get/${username}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  getWishlistItems(wishlistId:number){
    return this.http.get<WishlistItemDto[]>(`${WISHLIST_API}/getWishlistItems/${wishlistId}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  addWishlistItemToWishlist(wishlistItem: WishlistDto){
    return this.http.post<SuccessMessage>(`${WISHLIST_API}/saveWishlistItem`,wishlistItem)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.message))
        })
      );
  }

  deleteWithLogin (wishlistItemId: number){
    return this.http.delete<SuccessMessage>(`${WISHLIST_API}/delete/cart/items/${wishlistItemId}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

}
