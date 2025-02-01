import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, throwError} from "rxjs";

import {UtilService} from "./util.service";
import {environment} from "../../environments/environment";
import {ApiResponse} from "../shared/api-response";
import {CartItemResponse} from "../shared/response/cart-item-response";
import {CartItemRequest} from "../shared/request/cart-item-request";
import {CartResponse} from "../shared/response/cart-response";


const CART_ITEM_API = `${environment.springboot_url}/api/v1/user/cart`;
// const CART_ITEM_API = `${environment.springboot_url}/test/cart`;

@Injectable({
  providedIn: 'root'
})
export class CartItemService{
  cartItems: CartItemResponse[];

  cartItemsBehavior:BehaviorSubject<CartItemResponse[]> = new BehaviorSubject([]);
  cartItems$ = this.cartItemsBehavior.asObservable();

  addCartItemsBehavior:BehaviorSubject<CartItemResponse> = new BehaviorSubject(null);
  addCartItems$ = this.addCartItemsBehavior.asObservable();

  deleteCartItemsBehavior:BehaviorSubject<number> = new BehaviorSubject(null);
  deleteCartItems$ = this.deleteCartItemsBehavior.asObservable();
  constructor(private readonly http:HttpClient,
              private readonly utilService:UtilService) {

  }

  getCartItemsFromLocalStorage(): CartItemResponse[] {
    // Retrieve cart items from local storage, parse the JSON, and return them
    const cartItemsJSON = localStorage.getItem('cartItems');
    return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
  }


  saveCartItemsFromLocalStorage(cartItems: CartItemResponse[]){
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }



  removeCartItemsFromLocalStorage() {
    localStorage.removeItem('cartItems');
  }


  addToCartNotLogin(cartItem: CartItemResponse): void {
    const cartItems: CartItemResponse[] = this.getCartItemsFromLocalStorage();
    const existingItemIndex = cartItems.findIndex(item=> item.productDetail.id === cartItem.productDetail.id);
    if(existingItemIndex != -1){
      cartItems[existingItemIndex].quantity ++;
      cartItems[existingItemIndex].total = cartItems[existingItemIndex].quantity * cartItems[existingItemIndex].price;
    }else{
      cartItems.push(cartItem);
      console.log("cart items: ", this.addCartItemsBehavior.value);
    }
    // Save the updated cart items to local storage
    this.saveCartItemsFromLocalStorage(cartItems);
    this.addCartItemsBehavior.next(cartItem);
    this.utilService.openSnackBar("Thêm vào giỏ hàng thành công", "Đóng");
  }

  addCartItemToCart(cartItem: CartItemRequest){
    return this.http.post<ApiResponse<string>>(`${CART_ITEM_API}/add`,cartItem)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  getCart(username: string){
    return this.http.get<ApiResponse<CartResponse>>(`${CART_ITEM_API}/myCart`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  getCartItems(cartId:number){
    return this.http.get<ApiResponse<CartItemResponse[]>>(`${CART_ITEM_API}/${cartId}/items`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  deleteWithLogin (cartItemID: number){
    this.deleteCartItemsBehavior.next(cartItemID);
    return this.http.delete<ApiResponse<string>>(`${CART_ITEM_API}/items/${cartItemID}`)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  deleteWithoutLogin(productDetailId: number){
    console.log(productDetailId)
    this.cartItems =  this.getCartItemsFromLocalStorage();
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].productDetail.id === productDetailId) {
        this.deleteCartItemsBehavior.next(this.cartItems[i].productDetail.id);
        this.cartItems.splice(i, 1); // Remove the item at index i
        this.saveCartItemsFromLocalStorage(this.cartItems);
        break; // Exit the loop after removing the item
      }
    }
    if(this.cartItems.length === 0){
      this.removeCartItemsFromLocalStorage();
    }
  }

  updateCartItemQuantity(cartItemId:number, amount:number){
    return this.http.put<ApiResponse<string>>(`${CART_ITEM_API}/items/${cartItemId}`, amount)
      .pipe(
        map(response => response.result),
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

}
