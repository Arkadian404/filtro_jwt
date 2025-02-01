import {ProductImageResponse} from "./product-image-response";
import {ProductDetailResponse} from "./product-detail-response";
import {CartResponse} from "./cart-response";

export interface CartItemResponse{
  id?: number;
  productName?: string;
  slug?: string;
  productImage?: ProductImageResponse;
  productDetail?: ProductDetailResponse;
  cart?: CartResponse;
  quantity?: number;
  price?: number;
  total?: number;
  purchaseDate?: Date;
}
