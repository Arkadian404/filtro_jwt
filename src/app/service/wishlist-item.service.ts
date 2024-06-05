import {ElementRef, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WishlistDto} from "../shared/dto/wishlist-dto";
import {BehaviorSubject, catchError, throwError} from "rxjs";
import {WishlistItemDto} from "../shared/dto/wishlist-item-dto";
import {SuccessMessage} from "../shared/models/success-message";
import {UtilService} from "./util.service";
import {environment} from "../../environments/environment";



const WISHLIST_API = `${environment.springboot_url}/api/v1/user/wishlist`;

@Injectable({
  providedIn: 'root'
})
export class WishlistItemService {

  wishlistItems: WishlistItemDto[];
  isWishlist: boolean[] = [];

  addWishlistItemsBehavior:BehaviorSubject<WishlistItemDto> = new BehaviorSubject(null);
  addWishlistItems$ = this.addWishlistItemsBehavior.asObservable();

  wishlistItemsBehavior:BehaviorSubject<WishlistItemDto[]> = new BehaviorSubject([]);
  wishlistItems$ = this.wishlistItemsBehavior.asObservable();

  deleteWishlistItemsBehavior:BehaviorSubject<number> = new BehaviorSubject(null);
  deleteWishlistItems$ = this.deleteWishlistItemsBehavior.asObservable();




  constructor(private http:HttpClient,
              private utilService:UtilService) { }

  getWishlistItemsFromLocalStorage(): WishlistItemDto[] {
    const wishlistItemsJSON = localStorage.getItem('wishlistItems');
    return wishlistItemsJSON ? JSON.parse(wishlistItemsJSON) : [];
  }

  saveWishlistItemsToLocalStorage(wishlistItems: WishlistItemDto[]){
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }

  removeWishlistItemsFromLocalStorage() {
    localStorage.removeItem('wishlistItems');
  }



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

  handleWishlistNotLogin(wishlistItem: WishlistItemDto): void {
    const wishlistItems = this.getWishlistItemsFromLocalStorage();
    const existingItemIndex = wishlistItems.findIndex(item => item.product?.id === wishlistItem.product?.id);
    console.log(existingItemIndex);
    if (existingItemIndex != -1) {
      console.log(wishlistItem.product.id)
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
      if (this.wishlistItems[i].product?.id === productId) {
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
    return this.http.delete<SuccessMessage>(`${WISHLIST_API}/delete/wishlist/items/${wishlistItemId}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

}
