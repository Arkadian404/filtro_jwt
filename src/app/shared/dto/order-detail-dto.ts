import {OrderDto} from "./order-dto";
import {ProductDetailDto} from "./product-detail-dto";
import {ProductImageDto} from "./product-image-dto";

export interface OrderDetailDto{
  id?: number;
  order?: OrderDto;
  productName?: string;
  productSlug?:string,
  productImage?: ProductImageDto;
  productDetail?: ProductDetailDto;
  quantity?: number;
  price?: number;
  total?: number;
  orderDate?: Date;
}
