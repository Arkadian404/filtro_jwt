
import {ProductDetailDto} from "./product-detail-dto";
import {CartDto} from "./cart-dto";
import {ProductImageDto} from "./product-image-dto";

export interface CartItemDto{
  id?: number,
  cart?: CartDto,
  productName?: string,
  slug?: string,
  productImage?:ProductImageDto;
  productDetail?: ProductDetailDto,
  quantity?: number,
  price?: number,
  total?:number,
  purchaseDate?: Date,

}
