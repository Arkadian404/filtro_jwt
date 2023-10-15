import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CartItem} from "../shared/models/cart-item";
import {catchError, throwError} from "rxjs";
import {Product} from "../shared/models/product/product";
import {ProductDto} from "../shared/dto/product-dto";
import {CartItemDto} from "../shared/dto/cart-item-dto";
import {ProductImage} from "../shared/models/product/product-image";
import {ProductImageDto} from "../shared/dto/product-image-dto";
import {CartItemListAPIResponse} from "../shared/models/response/CartItemListAPIResponse";
import {SuccessMessage} from "../shared/models/response/SuccessMessage";
import {Cart} from "../shared/models/cart";
import {SharedLoginUserNameService} from "./SharedLoginUserNameService";


const CART_ITEM_API:string = 'http://localhost:8080/api/v1/user/cart';

@Injectable({
  providedIn: 'root'
})
export class CartItemService{
  constructor(private  http:HttpClient,
              private shareLoginUserNameService: SharedLoginUserNameService,) {
  }

  getCartItemList(){
    return this.http.get<CartItem[]>(`${CART_ITEM_API}/getList`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: " + err.status)
          return throwError(()=> new Error(err.error.message));
        })
      )
  }
  getCartItemsFromLocalStorage(): CartItemDto[] {
    // Retrieve cart items from local storage, parse the JSON, and return them
    const cartItemsJSON = localStorage.getItem('cartItems');
    return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
  }

  getProductImagesFromLocalStorage(): ProductImageDto[] {
    // Retrieve cart items from local storage, parse the JSON, and return them
    const productImagesJSON = localStorage.getItem('productImage');
    return productImagesJSON ? JSON.parse(productImagesJSON) : [];
  }

  getCartFromLocalStorage(): Cart{
    const cartJson = localStorage.getItem('cart');
    console.log("cartJson: ", cartJson);
    return cartJson ? JSON.parse(cartJson): "";
  }


  //add  product to cart at home page or other page without login
  addToCartNotLogin(product: ProductDto): void {
    const cartItems: CartItemDto[] = this.getCartItemsFromLocalStorage();
    let productImages: ProductImageDto[] = this.getProductImagesFromLocalStorage();
    cartItems.push({
      id: product.id,
      cart: null,
      productName: product.name,
      productDetail: product.productDetails.at(0),
      price: product.productDetails.at(0).price,
      quantity: 1, // You can handle quantity as needed
      purchaseDate: new Date(),
    });
    productImages.push(product.images.at(0));

    // Save the updated cart items to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('productImage', JSON.stringify(productImages));
  }

  //add  product to cart at home page or other page without login
  addToCartAfterLogin(product: ProductDto) {
    const cartItems: CartItemDto[] = [];
    cartItems.push({
      id: product.id,
      cart: this.getCartFromLocalStorage(),
      productName: product.name,
      productDetail: product.productDetails.at(0),
      price: product.productDetails.at(0).price,
      quantity: 1, // You can handle quantity as needed
      purchaseDate: new Date(),
    });
    console.log("Chuan bi gui request!", cartItems);
    return this.http.post<SuccessMessage>(`${CART_ITEM_API}/saveCartItem`,cartItems)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  //convert list cart item into cart after login

  convertListCartItemAfterLogin() {
    console.log("da truy cao vao convertListCartItemAfterLogin ");
    const cartItems: CartItemDto[] = this.getCartItemsFromLocalStorage();
    return this.http.post<SuccessMessage>(`${CART_ITEM_API}/saveCartItem`,cartItems)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }

  getCart(username: string){
    console.log("Tien hanh lay thong tin cart sau khi login: ", username);
    return this.http.get<Cart>(`${CART_ITEM_API}/getCart?username=${username}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }


}
