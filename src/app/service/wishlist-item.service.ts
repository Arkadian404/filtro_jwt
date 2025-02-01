import {ElementRef, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WishlistDto} from "../shared/dto/wishlist-dto";
import {BehaviorSubject, catchError, map, throwError} from "rxjs";
import {WishlistItemDto} from "../shared/dto/wishlist-item-dto";
import {SuccessMessage} from "../shared/models/success-message";
import {UtilService} from "./util.service";
import {environment} from "../../environments/environment";
import {ApiResponse} from "../shared/api-response";
import {WishlistResponse} from "../shared/response/wishlist-response";
import {WishlistItemResponse} from "../shared/response/wishlist-item-response";
import {WishlistRequest} from "../shared/request/wishlist-request";
import {WishlistItemRequest} from "../shared/request/wishlist-item-request";



const WISHLIST_API = `${environment.springboot_url}/api/v1/user/wishlist`;
// const WISHLIST_API = `${environment.springboot_url}/test/wishlist`;

@Injectable({
  providedIn: 'root'
})
export class WishlistItemService {

  wishlistItems: WishlistItemResponse[];
  isWishlist: boolean[] = [];

  addWishlistItemsBehavior:BehaviorSubject<WishlistItemResponse> = new BehaviorSubject(null);
  addWishlistItems$ = this.addWishlistItemsBehavior.asObservable();

  wishlistItemsBehavior:BehaviorSubject<WishlistItemResponse[]> = new BehaviorSubject([]);
  wishlistItems$ = this.wishlistItemsBehavior.asObservable();

  deleteWishlistItemsBehavior:BehaviorSubject<number> = new BehaviorSubject(null);
  deleteWishlistItems$ = this.deleteWishlistItemsBehavior.asObservable();




  constructor(private readonly http:HttpClient,
              private readonly utilService:UtilService) { }

  getWishlistItemsFromLocalStorage(): WishlistItemResponse[] {
    const wishlistItemsJSON = localStorage.getItem('wishlistItems');
    return wishlistItemsJSON ? JSON.parse(wishlistItemsJSON) : [];
  }

  saveWishlistItemsToLocalStorage(wishlistItems: WishlistItemResponse[]){
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }

  removeWishlistItemsFromLocalStorage() {
    localStorage.removeItem('wishlistItems');
  }



  getWishlist(){
    return this.http.get<ApiResponse<WishlistResponse>>(`${WISHLIST_API}/myWishlist`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  getWishlistItems(wishlistId:number){
    return this.http.get<ApiResponse<WishlistItemResponse[]>>(`${WISHLIST_API}/${wishlistId}/items`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  addWishlistItemToWishlist(wishlistItem: WishlistItemRequest){
    return this.http.post<ApiResponse<string>>(`${WISHLIST_API}/items`,wishlistItem)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.message))
        })
      );
  }

  handleWishlistNotLogin(wishlistItem: WishlistItemResponse): void {
    const wishlistItems = this.getWishlistItemsFromLocalStorage();
    const existingItemIndex = wishlistItems.findIndex(item => item.product.id === wishlistItem.product.id);
    console.log(existingItemIndex);
    if (existingItemIndex != -1) {
      console.log(wishlistItem.product.id )
      this.deleteWishlistItemNotLogin(wishlistItem.product.id);
    }else{
      wishlistItems.push(wishlistItem);
      this.saveWishlistItemsToLocalStorage(wishlistItems);
      this.addWishlistItemsBehavior.next(wishlistItem);
      this.utilService.openSnackBar('Thêm sản phẩm vào danh sách yêu thích thành công', 'Đóng');
    }
  }

  deleteWishlistItemNotLogin(productId:number){
    this.wishlistItems = this.getWishlistItemsFromLocalStorage();
    for (let i = 0; i < this.wishlistItems.length; i++) {
      if (this.wishlistItems[i].product.id === productId) {
        this.wishlistItems.splice(i, 1);
        console.log(productId);
        this.deleteWishlistItemsBehavior.next(productId);
        this.saveWishlistItemsToLocalStorage(this.wishlistItems);
        break;
      }
    }
    if(this.wishlistItems.length === 0){
      this.removeWishlistItemsFromLocalStorage();
    }
    this.utilService.openSnackBar('Xóa sản phẩm khỏi danh sách yêu thích thành công', 'Đóng');
  }

  deleteWithLogin (wishlistItemId: number){
    return this.http.delete<ApiResponse<string>>(`${WISHLIST_API}/items/${wishlistItemId}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

}
