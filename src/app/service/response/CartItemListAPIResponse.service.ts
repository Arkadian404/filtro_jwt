import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {catchError, throwError} from "rxjs";
import {CartItemListAPIResponse} from "../../shared/models/response/CartItemListAPIResponse";

const CART_ITEM_API:string = 'http://localhost:8080/api/v1/user/cart';

@Injectable({
  providedIn: 'root'
})
export  class CartItemListAPIResponseService{
  constructor(private  http:HttpClient) {
  }
  getCartItemList(){
    return this.http.get<CartItemListAPIResponse>(`${CART_ITEM_API}/getList`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: " + err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }
}
