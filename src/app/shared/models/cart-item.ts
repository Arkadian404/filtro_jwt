import {Cart} from "./cart";
import {ProductDetail} from "./product/product-detail";
import {ProductDetailDto} from "../dto/product-detail-dto";


export interface CartItem{
  id?: number,
  cart: Cart,
  productDetail: ProductDetail,
  quantity?: number,
  price?: number,
  purchaseDate?: Date
}
