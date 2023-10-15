import {Cart} from "../models/cart";
import {ProductDetailDto} from "./product-detail-dto";

export interface CartItemDto{
  id?: number,
  cart: Cart,
  productName: string,
  productDetail: ProductDetailDto,
  quantity?: number,
  price?: number,
  purchaseDate?: Date
}
