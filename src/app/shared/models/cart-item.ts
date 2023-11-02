import {Cart} from "./cart";
import {ProductDetail} from "./product/product-detail";


export interface CartItem{
  id?: number,
  cart: Cart,
  productDetail?: ProductDetail,
  quantity?: number,
  price?: number,
  total?:number,
  purchaseDate?: Date
}
