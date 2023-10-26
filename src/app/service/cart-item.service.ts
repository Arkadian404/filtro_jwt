import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CartItem} from "../shared/models/cart-item";
import {BehaviorSubject, catchError, map, throwError} from "rxjs";
import {Product} from "../shared/models/product/product";
import {ProductDto} from "../shared/dto/product-dto";
import {CartItemDto} from "../shared/dto/cart-item-dto";
import {ProductImage} from "../shared/models/product/product-image";
import {ProductImageDto} from "../shared/dto/product-image-dto";
import {CartItemListAPIResponse} from "../shared/models/response/CartItemListAPIResponse";
import {SuccessMessage} from "../shared/models/response/SuccessMessage";
import {Cart} from "../shared/models/cart";
import {SharedLoginUserNameService} from "./SharedLoginUserNameService";
import {ProductDetailService} from "./product-detail.service";
import {ProductDetail} from "../shared/models/product/product-detail";
import {RequestCartItemData} from "../shared/models/request/RequestCartItemData";


const CART_ITEM_API:string = 'http://localhost:8080/api/v1/user/cart';

@Injectable({
  providedIn: 'root'
})
export class CartItemService{
  cartItemList = new BehaviorSubject(null);
  cartItemList$ = this.cartItemList.asObservable();
  cartItemListFromBackend: CartItemDto[] = [];
  cartItemExist: boolean = false;
  cartItemsValue: any[];
  cartItems: any[];
  productImages: any[];
  constructor(private  http:HttpClient,
              private shareLoginUserNameService: SharedLoginUserNameService,
              private productDetailService: ProductDetailService,
              ) {

  }

  getCartItemList(){
    return this.http.get<CartItemListAPIResponse>(`${CART_ITEM_API}/getList`)
      .pipe(
        catchError(err => {
          console.log("Error handled by Service: " + err.status)
          return throwError(()=> new Error(err.message));
        })
      )
  }
  getCartItemsFromLocalStorage(): CartItemDto[] {
    // Retrieve cart items from local storage, parse the JSON, and return them
    const cartItemsJSON = localStorage.getItem('cartItems');
    return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
  }

  removeCartItemsFromLocalStorage() {
    localStorage.removeItem('cartItems');
  }



  getProductImagesFromLocalStorage(): ProductImageDto[] {
    // Retrieve cart items from local storage, parse the JSON, and return them
    const productImagesJSON = localStorage.getItem('productImage');
    return productImagesJSON ? JSON.parse(productImagesJSON) : [];
  }

  checkNewCartItemExistWithoutLogin(productDetailId: number): boolean{
    let cartItems2 = this.getCartItemsFromLocalStorage();
    console.log("cartItems2: ", productDetailId);
    for (let i =0; i < cartItems2.length; i++){
      if (cartItems2[i].productDetailDto.id === productDetailId){
        return true;
      }
    }
    return false;
  }

  checkNewCartItemExistWithLogin(productDetailId: number, cartItemsParam: CartItemDto[]){
    for (let i =0; i < cartItemsParam.length; i++){
      if (cartItemsParam[i].productDetailDto.id === productDetailId){
        return true;
      }
    }
    return false;
  }

  getCartFromLocalStorage(): Cart{
    const cartJson = localStorage.getItem('cart');
    console.log("cartJson: ", cartJson);
    return cartJson ? JSON.parse(cartJson): "";
  }



  //add  product to cart at home page or other page without login
  addToCartNotLogin(product: ProductDto): void {
    if (this.checkNewCartItemExistWithoutLogin(product.productDetails.at(0).id) === true){
      console.log("cart item co ton tai trong local storage");
      return null;
    }
    const cartItems: CartItemDto[] = this.getCartItemsFromLocalStorage();
    let productImages: ProductImageDto[] = this.getProductImagesFromLocalStorage();
    cartItems.push({
      id: product.id,
      cart: null,
      productName: product.name,
      productDetailDto: product.productDetails.at(0),
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
    this.cartItemExist = false;
    // if(this.getCartItemListFromBackend(product) === null){
    //   console.log("this product detail exist in database");
    //   return null;
    // }
    this.getCartItemListFromBackend(product);



    return null;
    // if (this.checkNewCartItemExistWithLogin(product.id)){
    //   return null;
    // }
  }
  saveCartItemAPI(quantities: number[],
                  productDetailIds: number[]){
    return this.http.post<SuccessMessage>(`${CART_ITEM_API}/saveCartItem`,{quantities: quantities,
      productDetailIds: productDetailIds})
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.message))
        })
      );
  }
  getCartItemListFromBackend(product: ProductDto){
    return this.getCartItemList()
      .subscribe({
        next:(data)=>{
          console.log(data);
          this.cartItemListFromBackend = data.cartItemList;
          console.log("cartItemListFromBackend: ", this.cartItemListFromBackend);
          this.cartItemList.next(this.cartItemListFromBackend);
          this.cartItemList$.subscribe({
            next: data=> {
              console.log("data: ", data);
              this.cartItemsValue = data;
            },
            error: err=> {
              console.log(err)
            }
          });
          console.log("cartItemValue: ", this.cartItemsValue);
          if (this.cartItemsValue !== null || this.cartItemsValue.length > 0){
            if(this.checkNewCartItemExistWithLogin(product.productDetails.at(0).id, this.cartItemsValue) === true){
              console.log("cart item co ton tai trong behavior object");
              this.cartItemExist = true;
              console.log("cartItemExist trong getCartItemListFromBackend la true ");
              return null;
            }
            else {
              this.cartItemExist = false;
              console.log("cartItemExist trong getCartItemListFromBackend la false ");
              if (this.cartItemExist === false){
                console.log("cartItemExist trong addToCartAfterLogin la false ");
                console.log("chuan bi them san pham co id: ", product.id);
                const quantities: number[] = [];
                const productDetailIds: number[] = [];
                quantities.push(1);
                productDetailIds.push(product.productDetails.at(0).id);
                console.log("Tien hanh saveCartItemSubcribe co productDetailId: ", productDetailIds);
                this.saveCartItemSubcribe(quantities, productDetailIds);
              }
              else {
                console.log("cartItemExist trong addToCartAfterLogin la true ");
              }
              return null;
            }
          }
        },
        error:(err)=>{
          console.log(err)
        }
      });
  }

  saveCartItemSubcribe(quantities: number[],
                       productDetailIds: number[]){
    console.log("productDetailIds trong saveCartItemSubcribe: ", productDetailIds);
    this.saveCartItemAPI(quantities, productDetailIds).subscribe({
      next:(data)=>{
        console.log(data.message);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  // getCartItemListFromBackend(product: ProductDto){
  //   return this.getCartItemList().pipe(
  //     map(data => {
  //       console.log(data);
  //       this.cartItemListFromBackend = data.cartItemList;
  //       console.log("cartItemListFromBackend: ", this.cartItemListFromBackend);
  //       this.cartItemList.next(this.cartItemListFromBackend);
  //       this.cartItemList$.subscribe({
  //         next: data=> {
  //           console.log("data: ", data);
  //           this.cartItemsValue = data;
  //         },
  //         error: err=> {
  //           console.log(err)
  //         }
  //       });
  //       console.log("cartItemValue: ", this.cartItemsValue);
  //       if (this.cartItemsValue){
  //          if(this.checkNewCartItemExistWithLogin(product.productDetails.at(0).id, this.cartItemsValue) === true){
  //             console.log("cart item co ton tai trong behavior object");
  //             this.cartItemExist = true;
  //          }
  //          else {
  //            this.cartItemExist = false;
  //          }
  //
  //       }
  //       if (this.cartItemExist === false){
  //
  //       }
  //       return this.cartItemsValue;
  //
  //     }));
  // }

  //convert list cart item into cart after login

  convertListCartItemAfterLogin() {
    console.log("da truy cao vao convertListCartItemAfterLogin ");
    const cartItems: CartItemDto[] = this.getCartItemsFromLocalStorage();
    const quantities: number[] = [];
    const productDetailIds: number[] = [];
    // Loop through the cart items
    cartItems.forEach((cartItem: CartItemDto) => {
      // Push the quantity and productDetailDTO ID to the respective arrays
      quantities.push(cartItem.quantity);
      productDetailIds.push(cartItem.productDetailDto.id); // Assuming the ID is accessible this way
    });
    return this.http.post<SuccessMessage>(`${CART_ITEM_API}/saveCartItem`,{quantities: quantities,
                                                productDetailIds: productDetailIds})
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

  deleteWithLogin (cartItemID: number){
    return this.http.delete<SuccessMessage>(`${CART_ITEM_API}/delete/${cartItemID}`)
      .pipe(
        catchError(err=>{
          console.log('Error handled by Service...' + err.status);
          return throwError(()=>new Error(err.error.message))
        })
      );
  }
  deleteWithoutLogin(cartItemId: number){
    this.cartItems =  this.getCartItemsFromLocalStorage();
    this.productImages = this.getProductImagesFromLocalStorage();
    console.log(cartItemId);
    console.log(this.cartItems);
    console.log(this.productImages);
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id === cartItemId) {
        this.cartItems.splice(i, 1); // Remove the item at index i
        this.productImages.splice(i, 1);
        break; // Exit the loop after removing the item
      }
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    localStorage.setItem('productImage', JSON.stringify(this.productImages));
  }

}
