import {OrderResponse} from "./order-response";
import {ProductDetailResponse} from "./product-detail-response";
import {ProductImageResponse} from "./product-image-response";

export interface OrderDetailResponse{
  id:number;
  order:OrderResponse;
  productName:string;
  productSlug:string;
  productDetail:ProductDetailResponse
  productImage:ProductImageResponse;
  quantity:number;
  price:number;
  total:number;
  orderDate:Date;
}
