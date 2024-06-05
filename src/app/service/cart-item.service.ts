import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, throwError} from "rxjs";
import {CartItemDto} from "../shared/dto/cart-item-dto";

import {SuccessMessage} from "../shared/models/success-message";
import {CartDto} from "../shared/dto/cart-dto";
import {UtilService} from "./util.service";
import {environment} from "../../environments/environment";


const CART_ITEM_API:string = `${environment.springboot_url}/api/v1/user/cart`;

@Injectable({
  providedIn: 'root'
})
export class CartItemService{
  cartItems: CartItemDto[];

  cartItemsBehavior:BehaviorSubject<CartItemDto[]> = new BehaviorSubject([]);
  cartItems$ = this.cartItemsBehavior.asObservable();

  addCartItemsBehavior:BehaviorSubject<CartItemDto> = new BehaviorSubject(null);
  addCartItems$ = this.addCartItemsBehavior.asObservable();

  deleteCartItemsBehavior:BehaviorSubject<number> = new BehaviorSubject(null);
  deleteCartItems$ = this.deleteCartItemsBehavior.asObservable();
  constructor(private  http:HttpClient,
              private utilService:UtilService) {

  }

  getCartItemsFromLocalStorage(): CartItemDto[] {
    // Retrieve cart items from local storage, parse the JSON, and return them
    const cartItemsJSON = localStorage.getItem('cartItems');
    return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
  }


  saveCartItemsFromLocalStorage(cartItems: CartItemDto[]){
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }



  removeCartItemsFromLocalStorage() {
    localStorage.removeItem('cartItems');
  }


  addToCartNotLogin(cartItem: CartItemDto): void {
    const cartItems: CartItemDto[] = this.getCartItemsFromLocalStorage();
    const existingItemIndex = cartItems.findIndex(item=> item.productDetail.id === cartItem.productDetail.id);
    if(existingItemIndex != -1){
      cartItems[existingItemIndex].quantity ++;
      cartItems[existingItemIndex].total = cartItems[existingItemIndex].quantity * cartItems[existingItemIndex].price;
      // cartItems[existingItemIndex] = cartItem;
    }else{
      cartItems.push(cartItem);
      console.log("cart items: ", this.addCartItemsBehavior.value);
    }
    // Save the updated cart items to local storage
    this.saveCartItemsFromLocalStorage(cartItems);
    this.addCartItemsBehavior.next(cartItem);
    this.utilService.openSnackBar("Thêm vào giỏ hàng thành công", "Đóng");
  }

  addCartItemToCart(cartItem: CartItemDto){
    return this.http.post<SuccessMessage>(`${CART_ITEM_API}/saveCartItem`,cartItem)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  getCart(username: string){
    return this.http.get<CartDto>(`${CART_ITEM_API}/get/${username}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  getCartItems(cartId:number){
    return this.http.get<CartItemDto[]>(`${CART_ITEM_API}/${cartId}/getCartItems`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  deleteWithLogin (cartItemID: number){
    this.deleteCartItemsBehavior.next(cartItemID);
    return this.http.delete<SuccessMessage>(`${CART_ITEM_API}/delete/cart/items/${cartItemID}`)
      .pipe(
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
    return this.http.put<SuccessMessage>(`${CART_ITEM_API}/update/cart/items/${cartItemId}`, amount)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

}
